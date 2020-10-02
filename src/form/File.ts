import { Exprs, Types } from 'expangine-runtime';
import { addComponent, ComponentInstance, createIf, createSlot } from 'expangine-ui';
import { COLLECTION } from '../constants';
import { IconType, IconObject, IconClasses, IconRender } from '../elements/Icon';
import { ifConst, ifTemplate } from '../helpers';
import { Size, Alignment, Colors } from '../Types';


export interface FileAttributes
{
  label: string;
  name: string;
  showFileNames: boolean;
  multiple: boolean;
  accept: string;
  alignment: string;
  fullWidth: boolean;
  boxed: boolean;
  size: string;
  color: string;
  icon: IconType;
}

export interface FileEvents
{
  update: FileUpdateEvent;
}

export interface FileUpdateEvent
{
  nativeEvent: any;
  stop: boolean;
  prevent: boolean;
  file: File;
  files: FileList;
}

export interface FileState
{
  fileNames: string;
}

export type FileSlots = 'default' | 'name';

export interface FileComputed
{
  fileClasses: string;
  iconClasses: string;
}

export const FileType = Types.object({
  lastModified: Types.number(0, undefined, true),
  name: Types.text(),
  size: Types.number(),
  type: Types.text(),
});

export const FileUpdateEventType = Types.object({
  nativeEvent: Types.any(),
  stop: Types.bool(),
  prevent: Types.bool(),
  file: FileType,
  files: Types.list(FileType),
});

export const FileComponent = addComponent<FileAttributes, FileEvents, FileSlots, FileState, FileComputed>({
  collection: COLLECTION,
  name: 'file',
  attributes: {
    label: {
      type: Types.optional(Types.text()),
      default: Exprs.const('Choose a file...'),
    },
    name: Types.optional(Types.text()),
    color: Types.optional(Colors),
    size: Types.optional(Size),
    icon: Types.optional(IconObject),
    alignment: Types.optional(Alignment),
    showFileNames: Types.optional(Types.bool()),
    multiple: Types.optional(Types.bool()),
    accept: Types.optional(Types.text()),
    fullWidth: Types.optional(Types.bool()),
    boxed: Types.optional(Types.bool()),
  },
  computed: {
    fileClasses: Exprs.tuple(
      'file',
      Exprs.get('size'),
      Exprs.get('alignment'),
      ifTemplate(['color'], 'is-{value}'),
      ifConst(['showFileNames'], 'has-name'),
      ifConst(['boxed'], 'is-boxed'),
      ifConst(['fullWidth'], 'is-fullwidth'),
    ),
    iconClasses: Exprs.if(
      Exprs.get('icon'),
    ).than(
      IconClasses('icon', undefined, 'file-icon'),
    ),
  },
  state: {
    fileNames: Exprs.const(''),
  },
  events: {
    update: FileUpdateEventType,
  },
  slots: {
    default: Types.object(),
    name: Types.object(),
  },
  render: (c) =>
    ['div', {
      class: Exprs.get('fileClasses'),
    }, {
      drop: (e: any) => handleFiles(c, e, e.nativeEvent.dataTransfer?.files),
    }, [
      ['label', {
        class: 'file-label'
      }, {}, [
        ['input', {
          class: 'file-input',
          type: 'file',
          multiple: Exprs.get('multiple'),
          name: Exprs.get('name'),
          accept: Exprs.get('accept'),
        }, {
          change: (e: any) => handleFiles(c, e, e.nativeEvent.target.files),
        }],
        ['span', {
          class: 'file-cta',
        }, {}, [
          createIf(Exprs.get('icon'), [
            IconRender('iconClasses'),
          ]),
          ['span', {
            class: 'file-label',
          }, {}, [
            c.whenSlot('default', 
              () => createIf(Exprs.get('label'), [
                Exprs.get('label'),
              ]), 
              () => createSlot()
            ),
          ]],
        ]],
        c.whenSlot('name', 
          () => createIf(Exprs.get('showFileNames'), [ 
            ['span', {
              class: 'file-name',
            }, {}, [
              Exprs.get('fileNames')
            ]]
          ]),
          () => ['span', {
            class: 'file-name',
          }, {}, [
            createSlot({ name: 'name' })
          ]],
        ),
      ]]
    ]]
});

function handleFiles(c: ComponentInstance<FileAttributes, FileEvents, FileSlots, FileState, FileComputed>, e: any, files: FileList | undefined)
{
  if (files)
  {
    const filesList: File[] = Array.prototype.slice.call(files);

    if (filesList.length === 0)
    {
      return;
    }

    const multiple = c.scope.get('multiple');

    const fileNames = multiple
      ? filesList
        .map((f) => f.name)
        .join(', ')
      : filesList[0].name;
  
    c.scope.set('fileNames', fileNames);
  
    e.file = filesList[0];
    e.files = filesList;
  
    c.trigger('update', e);
  }
}
import "hztl-ui/types";

declare module "vue/types/vue" {
  interface Vue {
    appName: string;
    copyRight: string;
    hasPerm: (permKey: string) => boolean;
    hasEntryPerm: (
      permKey: string,
      tags?: string[],
      hasBelongs?: boolean
    ) => boolean;
    hasEntryTagsPerm: (
      permKey: string,
      tags: string[],
      hasBelongs?: boolean
    ) => boolean;
    hasEntryBelongsPerm: (
      key: string,
      permKey: string,
      belongs?: string[]
    ) => boolean;
    hasBelongsPermWithoutRoute: (
      key: string,
      permKey: string,
      belongs?: string[]
    ) => boolean;
    hasCompletePerm: (permKey: string) => boolean;
    hasAutoPerm: (key: string) => boolean;
    hasBelongsPerm: (key: string, belongs?: string[], tag?: string) => boolean;
    hasBelongsTagsPerm: (
      key: string,
      belongs?: string[],
      tag?: string
    ) => boolean;
    $dragging: {
      $on: (event: string, callback: Function) => {};
      $off: (event: string) => {};
    };
  }
}

import type { LocaleMessages } from 'vue-i18n';

export const enUS: LocaleMessages<any> = {
  no: {
    app: {
      name: 'no name',
      desc: 'no desc'
    }
  },
  placeholder: {
    input: {
      search: 'please input to search'
    }
  },
  nav: {
    aside: {
      home: 'home'
    }
  },
  header: {
    application: {
      topic: {
        all: 'all applications',
        mine: 'my applications'
      }
    },
    widget: {
      message: {
        title: 'message'
      },
      todo: {
        title: 'todo'
      },
      notice: {
        title: 'notice'
      }
    },
    setting: {
      group: {
        styles: 'header style',
        others: 'others'
      },
      fullscreen: 'fullscreen',
      unfullscreen: 'un fullscreen',
      direct: 'direct',
      language: 'language',
      clear: 'clear storage'
    },
    user: {
      group: {
        user: 'user menu',
        system: 'system menu'
      },
      logout: 'logout'
    }
  },
  notify: {
    unstart: 'unstart',
    started: 'started',
    nostatus: 'nostatus',
    unread: 'unread',
    readed: 'readed'
  }
};

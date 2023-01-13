import type { LocaleMessages } from 'vue-i18n';

export const zhCN: LocaleMessages<any> = {
  no: {
    app: {
      name: '暂无名称',
      desc: '暂无描述'
    }
  },
  placeholder: {
    input: {
      search: '请输入进行搜索'
    }
  },
  nav: {
    aside: {
      home: '首页'
    }
  },
  header: {
    application: {
      topic: {
        all: '全部应用',
        mine: '我的应用'
      }
    },
    widget: {
      message: {
        title: '消息'
      },
      todo: {
        title: '待办'
      },
      notice: {
        title: '通知'
      }
    },
    setting: {
      group: {
        styles: '顶部样式',
        others: '其他'
      },
      fullscreen: '全屏',
      unfullscreen: '退出全屏',
      direct: '方向',
      language: '语言',
      clear: '清理缓存'
    },
    user: {
      group: {
        user: '用户菜单',
        system: '系统菜单'
      },
      logout: '注销'
    }
  },
  notify: {
    unstart: '未开始',
    started: '已开始',
    nostatus: '无状态',
    unread: '未读',
    readed: '已读'
  }
};

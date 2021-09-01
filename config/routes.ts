export default [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      {
        path: '/user',
        component: '../layouts/UserLayout',
        routes: [
          {
            path: './login',
            name: 'login',
            component: './User/login',
          },
          {
            path: '/user',
            redirect: '/user/login',
          },
          {
            name: 'register-result',
            icon: 'smile',
            path: '/admin/user/register-result',
            component: './user/register-result',
          },
          {
            name: 'register',
            icon: 'smile',
            path: '/user/register',
            component: './user/register',
          },
          // {register
          //   component: '404',
          // },
        ],
      },
      {
        path:'/',
        component: '../layouts/SecurityLayout',  //是否登录的验证
        routes:[
          {
            path: '/',
            component: '../layouts/BasicLayout',
            // authority: ['admin', 'user'],
            routes: [{path:'/',redirect:'./dashboard/monitor'},

              {
                path: './dashboard',
                name: 'dashboard',
                icon: 'dashboard',

                routes: [
                  {
                    path: '/',
                    authority: ['admin', 'user'],
                    redirect: './dashboard/analysis',
                  },
                  {
                    name: 'analysis',
                    icon: 'smile',
                    path: '../dashboard/analysis',
                    component: './dashboard/analysis',
                  },
                  {
                    name: 'monitor',
                    icon: 'smile',
                    path: '../dashboard/monitor',
                    component: './dashboard/monitor',
                  },
                  {
                    name: 'workplace',
                    icon: 'smile',
                    path: '../dashboard/workplace',
                    component: './dashboard/workplace',
                  },
                ],
              },
              // {
              //   path: './form',
              //   icon: 'form',
              //   name: 'form',
              //   routes: [
              //     {
              //       path: '/',
              //       redirect: '/form/basic-form',
              //     },
              //     {
              //       name: 'basic-form',
              //       icon: 'smile',
              //       path: '../form/basic-form',
              //       component: './form/basic-form',
              //     },
              //     {
              //       name: 'step-form',
              //       icon: 'smile',
              //       path: '../form/step-form',
              //       component: './form/step-form',
              //     },
              //     {
              //       name: 'advanced-form',
              //       icon: 'smile',
              //       path: '../form/advanced-form',
              //       component: './form/advanced-form',
              //     },
              //   ],
              // },
              // {
              //   path: './list',
              //   icon: 'table',
              //   name: 'list',
              //   routes: [
              //     {
              //       path: '../list/search',
              //       name: 'search-list',
              //       component: './list/search',
              //       routes: [
              //         {
              //           path: '/admin/list/search',
              //           redirect: '/list/search/articles',
              //         },
              //         {
              //           name: 'articles',
              //           icon: 'smile',
              //           path: '/admin/list/search/articles',
              //           component: './list/search/articles',
              //         },
              //         {
              //           name: 'projects',
              //           icon: 'smile',
              //           path: '/admin/list/search/projects',
              //           component: './list/search/projects',
              //         },
              //         {
              //           name: 'applications',
              //           icon: 'smile',
              //           path: '/admin/list/search/applications',
              //           component: './list/search/applications',
              //         },
              //       ],
              //     },
              //     {
              //       path: '/',
              //       redirect: '/list/table-list',
              //     },
              //     {
              //       name: 'table-list',
              //       icon: 'smile',
              //       path: '../list/table-list',
              //       component: './list/table-list',
              //     },
              //     {
              //       name: 'basic-list',
              //       icon: 'smile',
              //       path: '../list/basic-list',
              //       component: './list/basic-list',
              //     },
              //     {
              //       name: 'card-list',
              //       icon: 'smile',
              //       path: '../list/card-list',
              //       component: './list/card-list',
              //     },
              //   ],
              // },
              // {
              //   path: './profile',
              //   name: 'profile',
              //   icon: 'profile',
              //   routes: [
              //     {
              //       path: '/',
              //       redirect: '/profile/basic',
              //     },
              //     {
              //       name: 'basic',
              //       icon: 'smile',
              //       path: '../profile/basic',
              //       component: './profile/basic',
              //     },
              //     {
              //       name: 'advanced',
              //       icon: 'smile',
              //       path: '../profile/advanced',
              //       component: './profile/advanced',
              //     },
              //   ],
              // },
              // {
              //   name: 'result',
              //   icon: 'CheckCircleOutlined',
              //   path: './result',
              //   routes: [
              //     {
              //       path: '/',
              //       redirect: '/result/success',
              //     },
              //     {
              //       name: 'success',
              //       icon: 'smile',
              //       path: '../result/success',
              //       component: './result/success',
              //     },
              //     {
              //       name: 'fail',
              //       icon: 'smile',
              //       path: '../result/fail',
              //       component: './result/fail',
              //     },
              //   ],
              // },
              // {
              //   name: 'exception',
              //   icon: 'warning',
              //   path: './exception',
              //   routes: [
              //     {
              //       path: '/',
              //       redirect: '/exception/403',
              //     },
              //     {
              //       name: '403',
              //       icon: 'smile',
              //       path: '../exception/403',
              //       component: './exception/403',
              //     },
              //     {
              //       name: '404',
              //       icon: 'smile',
              //       path: '../exception/404',
              //       component: './exception/404',
              //     },
              //     {
              //       name: '500',
              //       icon: 'smile',
              //       path: '../exception/500',
              //       component: './exception/500',
              //     },
              //   ],
              // },
              // {
              //   name: 'account',
              //   icon: 'user',
              //   path: './account',
              //   routes: [
              //     {
              //       path: '/',
              //       redirect: '/account/center',
              //     },
              //     {
              //       name: 'center',
              //       icon: 'smile',
              //       path: '../account/center',
              //       component: './account/center',
              //     },
              //     {
              //       name: 'settings',
              //       icon: 'smile',
              //       path: '../account/settings',
              //       component: './account/settings',
              //     },
              //   ],
              // },
              // {
              //   name: 'editor',
              //   icon: 'highlight',
              //   path: './editor',
              //   routes: [
              //     {
              //       path: '/',
              //       redirect: '/editor/flow',
              //     },
              //     {
              //       name: 'flow',
              //       icon: 'smile',
              //       path: '../editor/flow',
              //       component: './editor/flow',
              //     },
              //     {
              //       name: 'mind',
              //       icon: 'smile',
              //       path: '../editor/mind',
              //       component: './editor/mind',
              //     },
              //     {
              //       name: 'koni',
              //       icon: 'smile',
              //       path: '../editor/koni',
              //       component: './editor/koni',
              //     },
              //   ],
              // },
              {
                path: '/users',
                icon: 'table',
                name: 'users',
                routes: [
                  {
                    name: 'user-list',
                    icon: 'smile',
                    path: '../users/user-list',
                    component: './users',
                  },

                ],
              },
              {
                path: '/sysuser',
                icon: 'table',
                name: 'sysuser',
                routes: [
                  {
                    name: 'sysuser-list',
                    icon: 'smile',
                    path: '../sysuser/sysuser-list',
                    component: './sysuser/sysuser-list',
                  },
                  {
                    name: 'role-list',
                    icon: 'smile',
                    path: '../sysuser/role-list',
                    component: './role/role-list',
                  },
                  {
                    name: 'permission-list',
                    icon: 'smile',
                    path: '../sysuser/permission-list',
                    component: './permission/permission-list',
                  },
                  {
                    name: 'menu-list',
                    icon: 'smile',
                    path: '../sysuser/menu-list',
                    component: './menu/menu-list',
                  },

                ],
              },
              {
                path: './channel',
                icon: 'table',
                name: 'channel',
                routes: [
                  {
                    name: 'channel-list',
                    icon: 'smile',
                    path: '../channel/channel-list',
                    component: './channel',

                  },
                ],
              },
              {
                path: './information',
                icon: 'table',
                name: 'information',
                routes: [
                  {
                    name: 'information-list',
                    icon: 'smile',
                    path: '../information/information-list',
                    component: './information/information-list',
                  },
                  {
                    name: 'admininformation-list',
                    icon: 'smile',
                    path: '../information/adminInformation-list',
                    component: './information/adminInformation-list',
                  },
                ],
              },
              {
                path: './content',
                icon: 'table',
                name: 'content',
                routes: [
                  {
                    name: 'content-list',
                    icon: 'smile',
                    path: '../content/content-list',
                    component: './content/content-list',
                  },
                ],
              },
              {
                path: './scrape',
                icon: 'table',
                name: 'scrape',
                routes: [
                  {
                    name: 'scrape-list',
                    icon: 'smile',
                    path: '../scrape/scrape-list',
                    component: './scrape/scrape-list',
                  },
                ],
              },
              {
                path: './tagMapping',
                icon: 'table',
                authority: ['admin', 'user'],//权限控制
                name: 'tagMapping',
                routes: [
                  {
                    name: 'edit',
                    icon: 'smile',
                    path: '../tagmapping/edit',
                    component: './tagmapping/edit',
                  },
                ],
              },
              {
                path: './instruct',
                icon: 'table',
                authority: ['admin', 'user'],//权限控制
                name: 'instruct',
                routes: [
                  {
                    name: 'instruct-list',
                    icon: 'smile',
                    path: '../instruct/instruct-list',
                    component: './instruct/instruct-list',
                  },
                ],
              },
              {
                path: './top',
                icon: 'table',
                authority: ['admin', 'user'],//权限控制
                name: 'top',
                routes: [
                  {
                    name: 'top-list',
                    icon: 'smile',
                    path: '../top/top-list',
                    component: './top/top-list',
                  },
                ],
              },
              {
                path: './announce',
                icon: 'table',
                authority: ['admin', 'user'],//权限控制
                name: 'announce',
                routes: [
                  {
                    name: 'announce-list',
                    icon: 'smile',
                    path: '../announce/announce-list',
                    component: './announce/announce-list',
                  },
                ],
              },
              {
                path: './update',
                icon: 'table',
                authority: ['admin', 'user'],//权限控制
                name: 'update',
                routes: [
                  {
                    name: 'update-list',
                    icon: 'smile',
                    path: '../update/update-list',
                    component: './update/update-list',
                  },
                ],
              },
              {
                path: './node',
                icon: 'table',
                authority: ['admin', 'user'],//权限控制
                name: 'node',
                routes: [
                  {
                    name: 'node-list',
                    icon: 'smile',
                    path: '../node/node-list',
                    component: './node/node-list',
                  },
                ],
              },
              {
                path: './bootstrap',
                icon: 'table',
                authority: ['admin', 'user'],//权限控制
                name: 'bootstrap',
                routes: [
                  {
                    name: 'bootstrap-list',
                    icon: 'smile',
                    path: '../bootstrap/bootstrap-list',
                    component: './bootstrap/bootstrap-list',
                  },
                ],
              },
              {
                path: './property',
                icon: 'table',
                authority: ['admin', 'user'],//权限控制
                name: 'property',
                routes: [
                  {
                    name: 'property-list',
                    icon: 'smile',
                    path: '../property/property-list',
                    component: './property/property-list',
                  },
                ],
              },
              {
                path: './remotepin',
                icon: 'table',
                authority: ['admin', 'user'],//权限控制
                name: 'remotepin',
                routes: [
                  {
                    name: 'remotepin-list',
                    icon: 'smile',
                    path: '../remotepin/remotepin-list',
                    component: './remotepin/remotepin-list',
                  },
                ],
              },
              {
                component: '404',
              },


            ],
          },
        ],
      },
    ],
  },
];

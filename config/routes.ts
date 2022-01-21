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

            routes: [
              {path:'/',redirect:'./dashboard/monitor'},

              {
                path: './dashboard',
                name: 'dashboard',
                icon: 'dashboard',

                routes: [

                  {
                    name: 'analysis',
                    icon: 'smile',
                    path: './analysis',
                    component: './dashboard/analysis',
                  },
                  {
                    name: 'monitor',
                    icon: 'smile',
                    path: './monitor',
                    component: './dashboard/monitor',
                  },
                  {
                    name: 'workplace',
                    icon: 'smile',
                    path: './workplace',
                    component: './dashboard/workplace',
                  },
                ],
              },

              {
                path: './client',
                icon: 'table',
                name: 'client',
                routes: [
                  {
                    path: './discovery',
                    icon: 'table',
                    authority: ['admin', 'user'],//权限控制
                    name: 'discovery',
                    component: './discovery/discovery-list',
                  },
                  {
                    path: './top',
                    icon: 'table',
                    authority: ['admin', 'user'],//权限控制
                    name: 'top',
                    routes: [
                      {
                        name: 'page-list',
                        icon: 'smile',
                        path: './page-list',
                        component: './top/page-list',
                      },
                      {
                        name: 'top-list',
                        icon: 'smile',
                        path: './top-list',
                        component: './top/top-list',
                      },
                    ],
                  },
                  {
                    path: './announce',
                    icon: 'table',
                    authority: ['admin', 'user'],//权限控制
                    name: 'announce',
                    component: './announce/announce-list',
                  },

                ],
              },
              {
                path: './adminend',
                icon: 'table',
                name: 'adminend',
                routes: [
                  {
                    path: './channel',
                    icon: 'table',
                    name: 'channel',
                    component: './channel',
                  },
                  {
                    path: './information',
                    icon: 'table',
                    name: 'information',
                    routes: [
                      {
                        name: 'information-list',
                        icon: 'smile',
                        path: './information-list',
                        component: './information/information-list',
                      },
                      {
                        name: 'admininformation-list',
                        icon: 'smile',
                        path: './adminInformation-list',
                        component: './information/adminInformation-list',
                      },
                    ],
                  },
                  {
                    path: './content',
                    icon: 'table',
                    name: 'content',
                    component: './content/content-list',

                  },
                  {
                    path: './scrape',
                    icon: 'table',
                    name: 'scrape',
                    component: './scrape/scrape-list',

                  },
                  {
                    path: './instruct',
                    icon: 'table',
                    authority: ['admin', 'user'],//权限控制
                    name: 'instruct',
                    component: './instruct/instruct-list',

                  },
                  {
                    path: './update',
                    icon: 'table',
                    authority: ['admin', 'user'],//权限控制
                    name: 'update',
                    component: './update/update-list',

                  },
                  {
                    path: './remotepin',
                    icon: 'table',
                    authority: ['admin', 'user'],//权限控制
                    name: 'remotepin',
                    component: './remotepin/remotepin-list',

                  },
                  {
                    path: './users',
                    icon: 'table',
                    name: 'users',
                    component: './users',

                  },
                  {
                    path: './tagMapping',
                    icon: 'table',
                    authority: ['admin', 'user'],//权限控制
                    name: 'tagMapping',
                    component: './tagmapping/edit',

                  },

                ],
              },
              {
                path: './node',
                icon: 'table',
                name: 'node',
                routes: [
                  {
                    path: './bootstrap',
                    icon: 'table',
                    authority: ['admin', 'user'],//权限控制
                    name: 'bootstrap',
                    component: './bootstrap/bootstrap-list',
                  },
                  {
                    path: './node',
                    icon: 'table',
                    authority: ['admin', 'user'],//权限控制
                    name: 'node',
                    component: './node/node-list',

                  },

                ],
              },
              {
                path: './system',
                icon: 'table',
                name: 'system',
                routes: [
                  {
                    path: './sysuser',
                    icon: 'table',
                    name: 'sysuser',
                    routes: [
                      {
                        name: 'organization-list',
                        icon: 'smile',
                        path: './organization-list',
                        component: './organization/organization-list',
                      },
                      {
                        name: 'sysuser-list',
                        icon: 'smile',
                        path: './sysuser-list',
                        component: './sysuser/sysuser-list',
                      },
                      {
                        name: 'role-list',
                        icon: 'smile',
                        path: './role-list',
                        component: './role/role-list',
                      },
                      {
                        name: 'permission-list',
                        icon: 'smile',
                        path: './permission-list',
                        component: './permission/permission-list',
                      },
                      {
                        name: 'menu-list',
                        icon: 'smile',
                        path: './menu-list',
                        component: './menu/menu-list',
                      },

                    ],
                  },
                  {
                    path: './property',
                    icon: 'table',
                    authority: ['admin', 'user'],//权限控制
                    name: 'property',
                    component: './property/property-list',
                  },
                ],
              },




              // {
              //   path: './users',
              //   icon: 'table',
              //   name: 'users',
              //   routes: [
              //     {
              //       name: 'user-list',
              //       icon: 'smile',
              //       path: './users/user-list',
              //       component: './users',
              //     },
              //
              //   ],
              // },
              // {
              //   path: './sysuser',
              //   icon: 'table',
              //   name: 'sysuser',
              //   routes: [
              //     {
              //       name: 'organization-list',
              //       icon: 'smile',
              //       path: './organization-list',
              //       component: './organization/organization-list',
              //     },
              //     {
              //       name: 'sysuser-list',
              //       icon: 'smile',
              //       path: './sysuser-list',
              //       component: './sysuser/sysuser-list',
              //     },
              //     {
              //       name: 'role-list',
              //       icon: 'smile',
              //       path: './role-list',
              //       component: './role/role-list',
              //     },
              //     {
              //       name: 'permission-list',
              //       icon: 'smile',
              //       path: './permission-list',
              //       component: './permission/permission-list',
              //     },
              //     {
              //       name: 'menu-list',
              //       icon: 'smile',
              //       path: './menu-list',
              //       component: './menu/menu-list',
              //     },
              //
              //   ],
              // },
              // {
              //   path: './channel',
              //   icon: 'table',
              //   name: 'channel',
              //   routes: [
              //     {
              //       name: 'channel-list',
              //       icon: 'smile',
              //       path: './channel-list',
              //       component: './channel',
              //
              //     },
              //   ],
              // },
              // {
              //   path: './information',
              //   icon: 'table',
              //   name: 'information',
              //   routes: [
              //     {
              //       name: 'information-list',
              //       icon: 'smile',
              //       path: './information-list',
              //       component: './information/information-list',
              //     },
              //     {
              //       name: 'admininformation-list',
              //       icon: 'smile',
              //       path: './adminInformation-list',
              //       component: './information/adminInformation-list',
              //     },
              //   ],
              // },
              // {
              //   path: './content',
              //   icon: 'table',
              //   name: 'content',
              //   routes: [
              //     {
              //       name: 'content-list',
              //       icon: 'smile',
              //       path: './content-list',
              //       component: './content/content-list',
              //     },
              //   ],
              // },
              // {
              //   path: './scrape',
              //   icon: 'table',
              //   name: 'scrape',
              //   routes: [
              //     {
              //       name: 'scrape-list',
              //       icon: 'smile',
              //       path: './scrape-list',
              //       component: './scrape/scrape-list',
              //     },
              //   ],
              // },
              // {
              //   path: './tagMapping',
              //   icon: 'table',
              //   authority: ['admin', 'user'],//权限控制
              //   name: 'tagMapping',
              //   routes: [
              //     {
              //       name: 'edit',
              //       icon: 'smile',
              //       path: './edit',
              //       component: './tagmapping/edit',
              //     },
              //   ],
              // },
              // {
              //   path: './instruct',
              //   icon: 'table',
              //   authority: ['admin', 'user'],//权限控制
              //   name: 'instruct',
              //   routes: [
              //     {
              //       name: 'instruct-list',
              //       icon: 'smile',
              //       path: './instruct-list',
              //       component: './instruct/instruct-list',
              //     },
              //   ],
              // },
              // {
              //   path: './top',
              //   icon: 'table',
              //   authority: ['admin', 'user'],//权限控制
              //   name: 'top',
              //   routes: [
              //     {
              //       name: 'page-list',
              //       icon: 'smile',
              //       path: './page-list',
              //       component: './top/page-list',
              //     },
              //     {
              //       name: 'top-list',
              //       icon: 'smile',
              //       path: './top-list',
              //       component: './top/top-list',
              //     },
              //   ],
              // },
              // {
              //   path: './announce',
              //   icon: 'table',
              //   authority: ['admin', 'user'],//权限控制
              //   name: 'announce',
              //   routes: [
              //     {
              //       name: 'announce-list',
              //       icon: 'smile',
              //       path: './announce-list',
              //       component: './announce/announce-list',
              //     },
              //   ],
              // },
              // {
              //   path: './update',
              //   icon: 'table',
              //   authority: ['admin', 'user'],//权限控制
              //   name: 'update',
              //   routes: [
              //     {
              //       name: 'update-list',
              //       icon: 'smile',
              //       path: './update-list',
              //       component: './update/update-list',
              //     },
              //   ],
              // },
              // {
              //   path: './node',
              //   icon: 'table',
              //   authority: ['admin', 'user'],//权限控制
              //   name: 'node',
              //   routes: [
              //     {
              //       name: 'node-list',
              //       icon: 'smile',
              //       path: './node-list',
              //       component: './node/node-list',
              //     },
              //   ],
              // },
              // {
              //   path: './bootstrap',
              //   icon: 'table',
              //   authority: ['admin', 'user'],//权限控制
              //   name: 'bootstrap',
              //   routes: [
              //     {
              //       name: 'bootstrap-list',
              //       icon: 'smile',
              //       path: './bootstrap-list',
              //       component: './bootstrap/bootstrap-list',
              //     },
              //   ],
              // },
              // {
              //   path: './property',
              //   icon: 'table',
              //   authority: ['admin', 'user'],//权限控制
              //   name: 'property',
              //   routes: [
              //     {
              //       name: 'property-list',
              //       icon: 'smile',
              //       path: './property-list',
              //       component: './property/property-list',
              //     },
              //   ],
              // },
              // {
              //   path: './remotepin',
              //   icon: 'table',
              //   authority: ['admin', 'user'],//权限控制
              //   name: 'remotepin',
              //   routes: [
              //     {
              //       name: 'remotepin-list',
              //       icon: 'smile',
              //       path: './remotepin-list',
              //       component: './remotepin/remotepin-list',
              //     },
              //   ],
              // },
              // {
              //   path: './discovery',
              //   icon: 'table',
              //   authority: ['admin', 'user'],//权限控制
              //   name: 'discovery',
              //   routes: [
              //     {
              //       name: 'discovery-list',
              //       icon: 'smile',
              //       path: './discovery-list',
              //       component: './discovery/discovery-list',
              //     },
              //   ],
              // },


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

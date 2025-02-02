import { lazy } from "react";

export default {
    routes: [
        {
            index: true,
            path: '/',
            name: 'index',
            title: 'index',
            element: lazy(() => import('../layouts/index')),
            routes: [
                {
                    path: "/im",
                    name: "im",
                    title: "聊天消息",
                    element: lazy(() => import('../pages/chats')),
                    routes: [
                        {
                            index: true,
                            path: "/contacts",
                            name: "Contacts",
                            title: "联系人",
                            element: lazy(() => import('../pages/chats/tabs/contacts')),
                        },
                        {
                            path: "/chats",
                            name: "Chats",
                            title: "聊天",
                            element: lazy(() => import('../pages/chats/tabs/chats')),
                        },
                        {
                            path: "/settings",
                            name: "Settings",
                            title: "设置",
                            element: lazy(() => import('../pages/chats/tabs/settings')),
                        },
                        {
                            path: "/message",
                            name: "Message",
                            title: "消息",
                            element: lazy(() => import('../pages/chats/tabs/message')),
                        },
                    ],
                },
                /*
                {
                    index: true,
                    path: "/desktop",
                    name: 'desktop',
                    title: 'desktop',
                    element: lazy(() => import('../layouts/Desktop')),
                    routes: [
                        {
                            index: true,
                            path: "/list",
                            name: 'list',
                            title: 'list',
                            element: lazy(() => import('../pages/desktop/list')),
                        },
                        {
                            path: "/counter",
                            name: 'Counter',
                            title: 'Counter',
                            element: lazy(() => import('../pages/desktop/Counter')),
                        }
                    ]
                },
                */
                {
                    index: true,
                    path: "/mobile",
                    name: 'mobile',
                    title: 'mobile',
                    element: lazy(() => import('../layouts/Mobil')),
                    routes: [
                        {
                            index: true,
                            path: "/list",
                            name: 'list',
                            title: 'list',
                            element: lazy(() => import('../pages/mobile/list')),
                        },
                        {
                            path: "/counter",
                            name: 'Counter',
                            title: 'Counter',
                            element: lazy(() => import('../pages/mobile/Counter')),
                        }
                    ]
                },

            ]
        },

        {
            path: "*",
            name: '404',
            title: '404',
            element: lazy(() => import('../pages/error/404')),
        }
    ],

};

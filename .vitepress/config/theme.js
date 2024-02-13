import nav     from './nav'
import sidebar from './sidebar'


const repo = 'https://github.com/skyvar/knowledge-base'

export default {
    nav,
    sidebar,
    editLink: {
        pattern: `${repo}/edit/main/docs/:path`
    },
    i18nRouting: false,
    search: {
        provider: 'local'
    },
    socialLinks: [
        { icon: 'github', link: repo },
        { icon: 'slack', link: 'https://skyvar.slack.com' }
    ],
    footer: {
        message: 'Released under proprietary licensing.',
        copyright: `Copyright © ${new Date(). getFullYear()} SkyVar`
    }
}

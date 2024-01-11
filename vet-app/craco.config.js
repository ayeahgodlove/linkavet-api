const CracoLessPlugin = require('craco-less')
module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: {
                            '@primary-color': '#3498db',
                            '@link-color': '#2980b9',
                            '@success-color': '#27ae60',
                            '@warning-color': '#f39c12',
                            '@error-color': '#e74c3c',
                            '@font-size-base': '15px',
                            '@heading-color': '#121417',
                            '@text-color': '#2D3239',
                            '@text-color-secondary': '#3374FF',
                            '@disabled-color': 'rgba(0, 0, 0, 0.25)',
                            '@border-radius-base': '4px',
                            '@border-color-base': '#3498db',
                            '@box-shadow-base':
                                '0 3 px 6 px - 4 px rgba(0, 0, 0, 0.12),\
                                                      0 6 px 16 px 0 rgba(0, 0, 0, 0.08), \
                                                      0 9 px 28 px 8 px rgba(0, 0, 0, 0.05)',
                        },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
}

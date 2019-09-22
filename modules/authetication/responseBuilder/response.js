module.exports = function (type, meta, data) {
    switch (type) {
        case 'create':
            return {
                meta: {
                    status: meta.status,
                    success: meta.success,
                    message: meta.message,
                    version: '1.0',
                    authors: ['Rohit Sharma']
                },
                data: !data ? null
                    : {
                        type: "token",
                        attributes: {
                            value: data.attributes.value
                        }
                    }
            }
    }
};
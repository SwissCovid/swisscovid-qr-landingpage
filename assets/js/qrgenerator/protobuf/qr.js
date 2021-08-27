export default {
    nested: {
        qrpackage: {
            nested: {
                VenueType: {
                    values: {
                        USER_QR_CODE: 0,
                        CONTACT_TRACING_QR_CODE: 1,
                    },
                },
                SwissCovidLocationData: {
                    fields: {
                        version: {
                            type: "uint32",
                            id: 1,
                        },
                        type: {
                            type: "VenueType",
                            id: 2,
                        },
                        room: {
                            type: "string",
                            id: 3,
                        },
                        checkoutWarningDelayMs: {
                            type: "int64",
                            id: 4,
                        },
                        automaticCheckoutDelaylMs: {
                            type: "int64",
                            id: 5,
                        },
                        reminderDelayOptionsMs: {
                            type: "int64",
                            rule: "repeated",
                            id: 6,
                        },
                    }
                },
                TraceLocation: {
                    fields: {
                        version: {
                            type: "uint32",
                            id: 1,
                        },
                        description: {
                            type: "string",
                            id: 2,
                        },
                        address: {
                            type: "string",
                            id: 3,
                        },
                        startTimestamp: {
                            type: "uint64",
                            id: 4,
                        },
                        endTimestamp: {
                            type: "uint64",
                            id: 5,
                        }
                    }
                },
                CrowdNotifierData: {
                    fields: {
                        version: {
                            type: "uint32",
                            id: 1,
                        },
                        publicKey: {
                            type: "bytes",
                            id: 2,
                        },
                        cryptographicSeed: {
                            type: "bytes",
                            id: 3,
                        },
                        type: {
                            type: "uint32",
                            id: 4,
                        }
                    }
                },
                QRCodePayload: {
                    fields: {
                        version: {
                            type: "uint32",
                            id: 1,
                        },
                        locationData: {
                            type: "TraceLocation",
                            id: 2,
                        },
                        crowdNotifierData: {
                            type: "CrowdNotifierData",
                            id: 3,
                        },
                        countryData: {
                            type: "bytes",
                            id: 4,
                        }
                    }
                },               
            },
        },
    },
};
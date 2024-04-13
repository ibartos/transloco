export interface SocketioConfig {
    url: string;
    /** @see {@link ManagerOptions} */
    options?: Partial<SocketOptions & ManagerOptions>;
}

// ManagerOptions
interface ManagerOptions extends ConnectOpts {
    forceNew?: boolean;
    reconnection?: boolean;
    /**
     * Whether to upgrade the transport automatically
     */
    upgrade: boolean;

    /**
     * Forces JSONP for polling transport.
     */
    forceJSONP: boolean;

    /**
     * Determines whether to use JSONP when necessary for polling. If
     * disabled (by settings to false) an error will be emitted (saying
     * "No transports available") if no other transports are available.
     * If another transport is available for negotiation it will always be
     * used instead of JSONP.
     */
    jsonp: boolean;

    /**
     * Forces base 64 encoding for polling transport even when XHR2
     * responseType is available and WebSocket even if the used standard
     * supports binary.
     */
    forceBase64: boolean;

    /**
     * Enables XHR polling transport.
     */
    enablesXDR: boolean;

    /**
     * Enables WebSocket transport.
     */
    enablesWS: boolean;

    /**
     * An optional identifier for the client. That's useful for debugging.
     */
    id: string;

    /**
     * Timestamp (as msec) that is used to detect and close
     * 'dead' connections.
     */
    pingTimeout: number;

    /**
     * Timestamp (as msec) that is used to decide if the connection is
     * too long ago to be considered connected.
     */
    pingInterval: number;

    /**
     * Whether to send extra headers for the polling transport.
     */
    extraHeaders: Headers;

    /**
     * Whether local addresses are exposed when this is false (default: true)
     */
    localAddress: boolean;

    /**
     * How many ms before a connection is considered long term.
     */
    long: number;

    /**
     * Changes the color of the log output from the engine.io server
     */
    color: string;

    /**
     * Scheme to use for WebSocket connections (https/wss)
     */
    scheme: "http" | "https" | "ws" | "wss";

    /**
     * Whether to accept only WebSockets transports in the connection
     * process. If this is false, even if XHR/XD are available, Socket.IO
     * will always connect with WebSockets (which makes it *real* WebSockets).
     * If true, we have "hybrid" WebSockets transports that allow
     * a cross-fallback from WebSockets to XHR/XD if the WebSockets
     * connection cannot be established/dropped.
     */
    onlyBinaryUpgrades: boolean;

    /**
     * Per-message deflate compression (experimental)
     */
    perMessageDeflate: boolean | PerMessageDeflateOptions;
}

// SocketOptions
interface SocketOptions {
    /**
     * Name of the path to capture
     */
    path: string;

    /**
     * A list of transports to try (in order). Engine always attempts to
     * connect directly with the first one, provided the feature detection test
     * for it passes.
     */
    transports: Transport[];

    /**
     * Hash of options, indexed by transport name, overriding the common options
     */
    transportOptions: Record<string, TransportOptions>;

    /**
     * Defaults to true, whether the client should try to upgrade the
     * transport from long-polling to something better.
     */
    upgrade: boolean;

    /**
     * Whether the client should multiplex
     */
    multiplex: boolean;

    /**
     * Defaults to false, whether the client should signal batch support.
     */
    batchId: boolean;

    /**
     * Defaults to true, whether the client should send raw binary data.
     */
    binary: boolean;

    /**
     * EIO compression flag.
     * true (XHR/XDR) | false (WebSocket)
     */
    compress: boolean;

    /**
     * How many requests a connection can take (deprecated)
     */
    rememberUpgrade: number;

    /**
     * Will disable WS/WSS completely when this is true.
     * (defaults to false)
     */
    forceJSONP: boolean;

    /**
     * How long a transport has to be considered failed after a
     * connection has been established. During this time no open requests
     * will be assigned to the transport.
     */
    pollingDuration: number;

    /**
     * Ping timeout (ms), defaults to 5000
     */
    pingTimeout: number;

    /**
     * Ping interval (ms), defaults to 25000
     */
    pingInterval: number;

    /**
     * And optionally  any key-value pairs that will be passed to the
     * server
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    query: any;
}

// ConnectOpts
interface ConnectOpts {
    /**
     * Whether to upgrade the transport automatically
     */
    upgrade?: boolean;

    /**
     * Forces JSONP for polling transport.
     */
    forceJSONP?: boolean;

    /**
     * Determines whether to use JSONP when necessary for polling. If
     * disabled (by setting it to false), an error will be emitted (saying
     * "No transports available") if no other transports are available.
     * If another transport is available for negotiation, it will always be
     * used instead of JSONP.
     */
    jsonp?: boolean;

    /**
     * Forces base 64 encoding for polling transport even when XHR2
     * responseType is available and WebSocket even if the used standard
     * supports binary.
     */
    forceBase64?: boolean;

    /**
     * Enables XHR polling transport.
     */
    enablesXDR?: boolean;

    /**
     * Enables WebSocket transport.
     */
    enablesWS?: boolean;

    /**
     * An optional identifier for the client. That's useful for debugging.
     */
    id?: string;

    /**
     * Timestamp (in milliseconds) that is used to detect and close
     * 'dead' connections.
     */
    pingTimeout?: number;

    /**
     * Timestamp (in milliseconds) that is used to decide if the connection is
     * too long ago to be considered connected.
     */
    pingInterval?: number;

    /**
     * Whether to send extra headers for the polling transport.
     */
    extraHeaders?: Headers;

    /**
     * Whether local addresses are exposed when this is false (default: true)
     */
    localAddress?: boolean;

    /**
     * How many milliseconds before a connection is considered long-term.
     */
    long?: number;

    /**
     * Changes the color of the log output from the engine.io server.
     */
    color?: string;

    /**
     * Scheme to use for WebSocket connections (https/wss)
     */
    scheme?: "http" | "https" | "ws" | "wss";

    /**
     * Whether to accept only WebSockets transports in the connection
     * process. If this is false, even if XHR/XDR are available, Socket.IO
     * will always connect with WebSockets (which makes it *real* WebSockets).
     * If true, we have "hybrid" WebSockets transports that allow
     * a cross-fallback from WebSockets to XHR/XDR if the WebSockets
     * connection cannot be established/dropped.
     */
    onlyBinaryUpgrades?: boolean;

    /**
     * Per-message deflate compression (experimental)
     */
    perMessageDeflate?: boolean | PerMessageDeflateOptions;
}

// Transport
type Transport = "polling" | "websocket";

// TransportOptions
interface TransportOptions {
    /**
     * And optionally  any key-value pairs that will be passed to the
     * server
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    query?: any;
}

// PerMessageDeflateOptions
interface PerMessageDeflateOptions {
    /**
     * This is used for selective permessage-deflate compression.
     * It is a string that specifies a comma-separated list of
     * extensions to be used (negotiated). When the server does
     * not accept any extension, or the client does not support
     * any of the extensions sent by the server, the protocol
     * must fail and both endpoints must close the connection.
     */
    serverNoContextTakeover?: boolean;

    /**
     * This is used for selective permessage-deflate compression.
     * It is a string that specifies a comma-separated list of
     * extensions to be used (negotiated). When the server does
     * not accept any extension, or the client does not support
     * any of the extensions sent by the server, the protocol
     * must fail and both endpoints must close the connection.
     */
    clientNoContextTakeover?: boolean;

    /**
     * This is used for selective permessage-deflate compression.
     * It is a string that specifies a comma-separated list of
     * extensions to be used (negotiated). When the server does
     * not accept any extension, or the client does not support
     * any of the extensions sent by the server, the protocol
     * must fail and both endpoints must close the connection.
     */
    serverMaxWindowBits?: number;

    /**
     * This is used for selective permessage-deflate compression.
     * It is a string that specifies a comma-separated list of
     * extensions to be used (negotiated). When the server does
     * not accept any extension, or the client does not support
     * any of the extensions sent by the server, the protocol
     * must fail and both endpoints must close the connection.
     */
    clientMaxWindowBits?: number;

    /**
     * This is used for selective permessage-deflate compression.
     * It is a string that specifies a comma-separated list of
     * extensions to be used (negotiated). When the server does
     * not accept any extension, or the client does not support
     * any of the extensions sent by the server, the protocol
     * must fail and both endpoints must close the connection.
     */
    zlibDeflateOptions?: {
        // Options for zlib's deflate function.
        // See: https://nodejs.org/api/zlib.html#zlib_class_options
    };

    /**
     * This is used for selective permessage-deflate compression.
     * It is a string that specifies a comma-separated list of
     * extensions to be used (negotiated). When the server does
     * not accept any extension, or the client does not support
     * any of the extensions sent by the server, the protocol
     * must fail and both endpoints must close the connection.
     */
    zlibInflateOptions?: {
        // Options for zlib's inflate function.
        // See: https://nodejs.org/api/zlib.html#zlib_class_options
    };

    /**
     * This is used for selective permessage-deflate compression.
     * It is a string that specifies a comma-separated list of
     * extensions to be used (negotiated). When the server does
     * not accept any extension, or the client does not support
     * any of the extensions sent by the server, the protocol
     * must fail and both endpoints must close the connection.
     */
    threshold?: number;
}

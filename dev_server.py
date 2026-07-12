from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer


class StaticHandler(SimpleHTTPRequestHandler):
    extensions_map = {
        **SimpleHTTPRequestHandler.extensions_map,
        ".css": "text/css",
        ".js": "text/javascript",
        ".html": "text/html",
    }


if __name__ == "__main__":
    server = ThreadingHTTPServer(("127.0.0.1", 8081), StaticHandler)
    print("Servidor disponible en http://127.0.0.1:8081")
    server.serve_forever()

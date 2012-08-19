js.la server -- Run the js.la server
====================================

## SYNOPSIS

    js.la server [OPTIONS]

## DESCRIPTION

Serve the js.la site

    --host      The host to run the server on, defaults to "localhost"
    --port      The port to run the server on, defaults to "8080"
    --workers   The number of workers to use, defaults to system CPU count

## EXAMPLES

Run with defaults

    js.la server

Run with options:

    js.la server --host "127.0.0.1" --port 1337

import { Request, Response, RequestHandler } from 'express'
import * as Rollbar from 'rollbar'

let rollbar: Rollbar

/**
 * Set up rollbar integration to report server errors raised while using {@link server#handleRequest}
 * @param accessToken - Rollbar access token
 */
export function useRollbar(accessToken: string): void {
  if (!accessToken) return
  rollbar = new Rollbar({ accessToken })
}

/**
 * Wrapper for the request handler. It creates the appropiate response object and catches errors. For example:
 *     app.post('/api/path', handleRequest(async (req, res) => {
 *        const param = extractFromReq(req, 'param')
 *        await something()
 *        return 'Success'
 *    }))
 * @param callback - Actual handler, the return value will be used as response to the client. It will receive (req, res) as parameters
 * @return - Wrapper function
 */
export function handleRequest<T = Request, U = Response>(
  callback: (req: T, res: U) => any
): RequestHandler
export function handleRequest(
  callback: (req: Request, res: Response) => any
): RequestHandler {
  return async (req, res) => {
    try {
      const data = await callback(req, res)

      return res.json(sendOk(data))
    } catch (error) {
      const data = error.data || {}
      const message = error.message
      const statusCode = error.statusCode

      if (rollbar) rollbar.error(error, req)

      if (statusCode) {
        res.status(statusCode)
      }

      return res.json(sendError(data, message))
    }
  }
}

/**
 * Get a named parameter from a request object. It leverages GET and POST requests and parses JSON objects
 * @param req   - Express js request object. Check {@link https://expressjs.com} for more info.
 * @param param - Searched param
 * @return - The param value, it throws if it's not present
 */
export function extractFromReq<T = string>(req: Request, param: string): T {
  let value

  if (req.query && req.query[param]) {
    value = req.query[param]
  } else if (req.body && req.body[param]) {
    value = req.body[param]
  } else if (req.params && req.params[param]) {
    value = req.params[param]
  }

  if (!value) {
    throw new Error(`Could not get ${param} from request`)
  }

  return value
}

export function sendOk(data) {
  return { ok: true, data }
}

export function sendError(data, error) {
  return { ok: false, data, error }
}

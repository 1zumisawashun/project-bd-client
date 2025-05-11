import { NextResponse } from 'next/server'

/**
 * @swagger
 * /api/hello:
 *   get:
 *     description: Returns the hello world
 *     responses:
 *       200:
 *        description: ""
 *        schema:
 *          type: "object"
 *          properties:
 *            message:
 *              type: "number"
 *              description: ""
 */
export function GET() {
  return NextResponse.json({
    message: 100,
  })
}

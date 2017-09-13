import { Router } from 'express';
import studentsController from './students/student.controller';

const router = Router();
/**
 * @swagger
 * definitions:
 *   Status:
 *     properties:
 *       firstName:
 *         type: string
 *       lastName:
 *         type: string
 *       age:
 *         type: string
 *       gender:
 *         type: string
 *       class:
 *         type: string
 *       hobbies:
 *         type: string
 */
/**
 * 
 * @swagger
 * /api/students:
 *   get:
 *     summary: Get student with id
 *     tags:
 *       - Students
 *     parameters:
 *       - name: q
 *         in: query
 *         type: string
 *         required: false
 *     responses:
 *       200:
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Status'
 */
router.get('/students', studentsController().getAllStudents);

export default router;

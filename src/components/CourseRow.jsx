import React from "react";
import { Link } from "react-router-dom";

function CourseRow({ course, i, onDelete }) {
    return (
        <tr>
            <td className="fw-semibold">{i + 1}</td>
            <td>{course.code}</td>
            <td>{course.name}</td>
            <td>{course.duration}</td>
            <td> {Number(course.fee).toLocaleString()}</td>

            <td className="text-center">
                <div className="d-flex justify-content-center gap-2">
                    <Link to={`/courses/${course.id}`} className="btn btn-sm btn-outline-primary"
                        title="View">
                        <i className="fa-solid fa-eye"></i>
                    </Link>

                    <Link to={`/courses/${course.id}/edit`} className="btn btn-sm btn-outline-secondary"
                        title="Edit">
                        <i className="fa-solid fa-pen"></i>
                    </Link>

                    <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(course)}
                        title="Delete">
                        <i className="fa-solid fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    );
}

export default CourseRow;

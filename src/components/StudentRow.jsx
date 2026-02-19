import React from "react";
import { Link } from "react-router-dom";

function StudentRow({ student, i, onDelete }) {
    return (
        <tr>
            <td className="fw-semibold">{i + 1}</td>
            <td>{student.name}</td>
            <td>{student.email}</td>
            <td>{student.regNo}</td>
            <td>{student.year}</td>
            <td>{student.courseCode}</td>

            <td className="text-center">
                <div className="d-flex justify-content-center gap-2">
                    <Link to={`/students/${student.id}`} className="btn btn-sm btn-outline-primary"
                        title="View">
                        <i className="fa-solid fa-eye"></i>
                    </Link>
                    <Link
                        to={`/students/${student.id}/edit`}
                        className="btn btn-sm btn-outline-secondary px-3"
                        title="Edit"
                    >
                        <i className="fa-solid fa-pen"></i>
                    </Link>

                    <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => onDelete(student)}
                        title="Delete"
                    >
                        <i className="fa-solid fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    );
}

export default StudentRow;

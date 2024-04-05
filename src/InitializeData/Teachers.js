import { useEffect, useState } from "react";
import { fetchTeachers } from "../Redux-TK/Slices/Teacher";
import { useDispatch, useSelector } from "react-redux";

export default function TeacherData(id) {
  const state = useSelector((state) => state.teachers);
  const dispatch = useDispatch();

  const [teacherInfo, setTeacherInfo] = useState({});

  useEffect(() => {
    dispatch(fetchTeachers());
  }, []);

  useEffect(() => {
    const teacher = state.teachers.find(
      (teacher) => parseInt(teacher.id) === parseInt(id)
    );
    if (teacher) {
      setTeacherInfo(teacher);
    }
  }, [state.teachers]);

  return teacherInfo;
}

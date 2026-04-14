import { Course } from '@/models/course';

let courses: Course[] = [
  {
    id: 1,
    name: 'React',
    teacher: 'Phan Quang Thành',
    students: 50,
    status: 'OPEN',
  },
];

export const getCourses = async () => courses;

export const addCourse = async (course: Course) => {
  const exist = courses.find(c => c.name === course.name);
  if (exist) throw new Error('Tên khóa học đã tồn tại');

  courses.push({ ...course, id: Date.now() });
};

export const updateCourse = async (course: Course) => {
  const exist = courses.find(
    c => c.name === course.name && c.id !== course.id,
  );
  if (exist) throw new Error('Tên khóa học đã tồn tại');

  courses = courses.map(c => (c.id === course.id ? course : c));
};

export const deleteCourse = async (id: number) => {
  const course = courses.find(c => c.id === id);

  
  if (!course) {
    throw new Error('Không tìm thấy khóa học');
  }

  if (course.students > 0) {
    throw new Error('Không thể xóa vì đã có học viên');
  }

  courses = courses.filter(c => c.id !== id);
};
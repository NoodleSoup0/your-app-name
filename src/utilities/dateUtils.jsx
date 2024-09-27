// Helper function to parse the meeting string
const parseMeets = (meets) => {
    if (!meets) return { days: '', startTime: '', endTime: '' };
    const [days, times] = meets.split(' ');
    const [startTime, endTime] = times.split('-');
    return { days, startTime, endTime };
};

// Helper function to convert time in HH:mm format to minutes
const parseTime = (timeStr) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes; // Convert to total minutes
};

// Function to check for overlapping days
const dayOverlap = (days1, days2) => {
    const set1 = new Set(days1);
    const set2 = new Set(days2);
    for (let day of set1) {
        if (set2.has(day)) return true;
    }
    return false;
};

// Main function to check if two time slots overlap
export const timesOverlap = (time1, time2) => {
    if (!time1 || !time2) return false; // Empty times never overlap

    const { days: days1, startTime: start1, endTime: end1 } = parseMeets(time1);
    const { days: days2, startTime: start2, endTime: end2 } = parseMeets(time2);

    const timeRange1 = [parseTime(start1), parseTime(end1)];
    const timeRange2 = [parseTime(start2), parseTime(end2)];

    return dayOverlap(days1, days2) &&
           (timeRange1[0] < timeRange2[1] && timeRange2[0] < timeRange1[1]);
};

// Function to check if a new course conflicts with selected courses
export const hasConflict = (newCourse, selectedCourses) => {
    return selectedCourses.some(selectedCourse => {
        return selectedCourse.term === newCourse.term &&
               timesOverlap(selectedCourse.meets, newCourse.meets);
    });
};

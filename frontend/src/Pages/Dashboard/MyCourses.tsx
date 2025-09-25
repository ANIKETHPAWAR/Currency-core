import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { Button } from "../../components/ui/button";
import type { IPurchase } from "../../types/purchase.interface";


const MyCourses = () => {
      const [courses, setCourses] = useState<IPurchase[]>([]);
      const [loading, setLoading] = useState(true);

      useEffect(() => {
            const fetchCourses = async () => {
                  try {
                        const response = await axiosInstance.get('/purchase/my-courses');
                        setCourses(response.data.data);
                  } catch (error) {
                        console.error("Failed to fetch courses", error);
                  } finally {
                        setLoading(false);
                  }
            };
            fetchCourses();
      }, []);

      if (loading) {
            return <div className="text-center text-white py-24">Loading your courses...</div>;
      }

      return (
            <div className="bg-black text-white min-h-screen py-24">
                  <div className="container mx-auto px-4">
                        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-8">
                              <h1 className="text-3xl font-bold mb-8">My Courses</h1>
                              {courses.length > 0 ? (
                                    <div className="space-y-6">
                                          {courses.map(course => (
                                                <div key={course._id} className="bg-black/50 p-6 rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border border-gray-700">
                                                      <div className="flex-1">
                                                            <h2 className="text-xl font-semibold text-white">{course.courseTitle}</h2>
                                                            <div className="flex flex-wrap items-center gap-4 mt-2">
                                                                  <p className="text-sm text-gray-400">
                                                                        Purchased: {new Date(course.createdAt).toLocaleDateString('en-GB')}
                                                                  </p>
                                                                  <p className="text-sm text-gray-400">
                                                                        Mode: <span className="font-medium text-blue-400">{course.purchaseType}</span>
                                                                  </p>
                                                                  {course.paymentMethod && (
                                                                        <p className="text-sm text-gray-400">
                                                                              Payment: <span className="font-medium text-green-400 capitalize">{course.paymentMethod}</span>
                                                                        </p>
                                                                  )}
                                                                  <p className="text-sm text-gray-400">
                                                                        Status: <span className={`font-medium ${course.paymentStatus === 'Completed' ? 'text-green-400' : course.paymentStatus === 'Pending' ? 'text-yellow-400' : 'text-red-400'}`}>
                                                                              {course.paymentStatus}
                                                                        </span>
                                                                  </p>
                                                                  <p className="text-lg font-bold text-blue-400">
                                                                        ₹{course.price.toLocaleString()}
                                                                  </p>
                                                            </div>
                                                      </div>
                                                      <Button className="bg-blue-600 hover:bg-blue-700 mt-4 md:mt-0 px-6">View Course</Button>
                                                </div>
                                          ))}
                                    </div>
                              ) : (
                                    <div className="text-center py-12">
                                          <p className="text-gray-500">You have not purchased any courses yet.</p>
                                          <Button asChild className="mt-4">
                                                <a href="/courses">Explore Courses</a>
                                          </Button>
                                    </div>
                              )}
                        </div>
                  </div>
            </div>
      );
};

export default MyCourses;
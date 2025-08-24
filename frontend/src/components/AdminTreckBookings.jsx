import React, { useState, useMemo } from 'react';
import { Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react';

const AdminTreckBookings = () => {
  // Sample booking data
  const [bookings] = useState([
    {
      id: 'BK20250722-001',
      name: 'Rahul Sharma',
      email: 'rahul.sharma@email.com',
      mobile: '+91 9876543210',
      dateSlot: '2025-08-15 to 2025-08-17',
      bookingTime: '22 July 2025, 4:30 PM',
      persons: 2,
      trekStatus: 'Upcoming'
    },
    {
      id: 'BK20250722-002',
      name: 'Priya Patel',
      email: 'priya.patel@email.com',
      mobile: '+91 9876543211',
      dateSlot: '2025-08-15 to 2025-08-17',
      bookingTime: '22 July 2025, 5:15 PM',
      persons: 4,
      trekStatus: 'Upcoming'
    },
    {
      id: 'BK20250722-003',
      name: 'Amit Desai',
      email: 'amit.desai@email.com',
      mobile: '+91 9876543212',
      dateSlot: '2025-08-22 to 2025-08-24',
      bookingTime: '22 July 2025, 6:00 PM',
      persons: 1,
      trekStatus: 'Upcoming'
    },
    {
      id: 'BK20250722-004',
      name: 'Sneha Kulkarni',
      email: 'sneha.kulkarni@email.com',
      mobile: '+91 9876543213',
      dateSlot: '2025-07-15 to 2025-07-17',
      bookingTime: '22 July 2025, 7:20 PM',
      persons: 3,
      trekStatus: 'Completed'
    },
    {
      id: 'BK20250722-005',
      name: 'Vikram Singh',
      email: 'vikram.singh@email.com',
      mobile: '+91 9876543214',
      dateSlot: '2025-07-10 to 2025-07-12',
      bookingTime: '22 July 2025, 8:45 PM',
      persons: 2,
      trekStatus: 'Completed'
    },
    {
      id: 'BK20250722-006',
      name: 'Meera Joshi',
      email: 'meera.joshi@email.com',
      mobile: '+91 9876543215',
      dateSlot: '2025-08-22 to 2025-08-24',
      bookingTime: '23 July 2025, 9:10 AM',
      persons: 5,
      trekStatus: 'Upcoming'
    },
    {
      id: 'BK20250722-007',
      name: 'Arjun Nair',
      email: 'arjun.nair@email.com',
      mobile: '+91 9876543216',
      dateSlot: '2025-08-15 to 2025-08-17',
      bookingTime: '23 July 2025, 10:30 AM',
      persons: 1,
      trekStatus: 'Upcoming'
    },
    {
      id: 'BK20250722-008',
      name: 'Kavya Reddy',
      email: 'kavya.reddy@email.com',
      mobile: '+91 9876543217',
      dateSlot: '2025-08-29 to 2025-08-31',
      bookingTime: '23 July 2025, 11:15 AM',
      persons: 2,
      trekStatus: 'Upcoming'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [trekStatusFilter, setTrekStatusFilter] = useState('All');
  const [dateSlotFilter, setDateSlotFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Get unique date slots for filter based on trek status
  const uniqueDateSlots = useMemo(() => {
    const filteredByStatus = trekStatusFilter === 'All' 
      ? bookings 
      : bookings.filter(booking => booking.trekStatus === trekStatusFilter);
    
    const slots = [...new Set(filteredByStatus.map(booking => booking.dateSlot))];
    return slots.sort();
  }, [bookings, trekStatusFilter]);

  // Filter bookings based on search and filters
  const filteredBookings = useMemo(() => {
    return bookings.filter(booking => {
      const matchesSearch = 
        booking.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.mobile.includes(searchTerm);
      
      const matchesTrekStatus = trekStatusFilter === 'All' || booking.trekStatus === trekStatusFilter;
      const matchesDateSlot = dateSlotFilter === 'All' || booking.dateSlot === dateSlotFilter;
      
      return matchesSearch && matchesTrekStatus && matchesDateSlot;
    });
  }, [bookings, searchTerm, trekStatusFilter, dateSlotFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedBookings = filteredBookings.slice(startIndex, startIndex + itemsPerPage);

  const getTrekStatusBadge = (status) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    switch (status) {
      case 'Upcoming':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'Completed':
        return `${baseClasses} bg-blue-100 text-blue-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const formatDateRange = (dateRange) => {
    const [startDate, endDate] = dateRange.split(' to ');
    const formatDate = (dateStr) => {
      return new Date(dateStr).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    };
    return `${formatDate(startDate)} - ${formatDate(endDate)}`;
  };

  // Reset pagination and date slot filter when trek status changes
  React.useEffect(() => {
    setCurrentPage(1);
    setDateSlotFilter('All'); // Reset date slot when trek status changes
  }, [trekStatusFilter]);

  // Reset pagination when other filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, dateSlotFilter]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Rajgad Monsoon Trek
              </h1>
              <p className="text-base md:text-lg text-gray-600">
                Total Bookings: <span className="font-semibold text-orange-600">{bookings.length}</span>
              </p>
            </div>
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 self-start md:self-auto">
              View Trek Details
            </button>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by name, email, or mobile..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* Filters */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full lg:w-auto">
              {/* Trek Status Filter */}
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Filter className="text-gray-400 w-4 h-4 flex-shrink-0" />
                <select
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none w-full sm:w-auto min-w-0 hover:border-orange-300 transition-colors"
                  value={trekStatusFilter}
                  onChange={(e) => setTrekStatusFilter(e.target.value)}
                >
                  <option value="All">All Trek Status</option>
                  <option value="Upcoming">Upcoming</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              {/* Date Slot Filter */}
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <select
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none w-full sm:w-auto min-w-0 hover:border-orange-300 transition-colors"
                  value={dateSlotFilter}
                  onChange={(e) => setDateSlotFilter(e.target.value)}
                  style={{
                    background: 'white'
                  }}
                >
                  <option value="All">All Date Slots</option>
                  {uniqueDateSlots.map((slot) => (
                    <option 
                      key={slot} 
                      value={slot}
                    >
                      {formatDateRange(slot)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-2 md:px-4 font-semibold text-gray-900 text-sm">Booking ID</th>
                  <th className="text-left py-3 px-2 md:px-4 font-semibold text-gray-900 text-sm">Person Name</th>
                  <th className="text-left py-3 px-2 md:px-4 font-semibold text-gray-900 text-sm hidden md:table-cell">Email</th>
                  <th className="text-left py-3 px-2 md:px-4 font-semibold text-gray-900 text-sm">Mobile</th>
                  <th className="text-left py-3 px-2 md:px-4 font-semibold text-gray-900 text-sm hidden lg:table-cell">Booking Time</th>
                  <th className="text-left py-3 px-2 md:px-4 font-semibold text-gray-900 text-sm">Persons</th>
                  <th className="text-left py-3 px-2 md:px-4 font-semibold text-gray-900 text-sm">Trek Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-2 md:px-4">
                      <span className="font-medium text-orange-600 text-sm break-all">{booking.id}</span>
                    </td>
                    <td className="py-4 px-2 md:px-4">
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-900 text-sm">{booking.name}</span>
                        <span className="text-xs text-gray-500 md:hidden break-all">{booking.email}</span>
                      </div>
                    </td>
                    <td className="py-4 px-2 md:px-4 text-gray-600 text-sm hidden md:table-cell">
                      <span className="break-all">{booking.email}</span>
                    </td>
                    <td className="py-4 px-2 md:px-4 text-gray-600 text-sm">
                      <div className="flex flex-col">
                        <span>{booking.mobile}</span>
                        <span className="text-xs text-gray-500 lg:hidden">{booking.bookingTime}</span>
                      </div>
                    </td>
                    <td className="py-4 px-2 md:px-4 text-gray-600 text-xs hidden lg:table-cell">
                      {booking.bookingTime}
                    </td>
                    <td className="py-4 px-2 md:px-4 text-center">
                      <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">
                        {booking.persons}
                      </span>
                    </td>
                    <td className="py-4 px-2 md:px-4">
                      <span className={getTrekStatusBadge(booking.trekStatus)}>
                        {booking.trekStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-700">
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredBookings.length)} of{' '}
              {filteredBookings.length} results
            </p>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-500 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                <span className="hidden sm:inline">Previous</span>
                <span className="sm:hidden">Prev</span>
              </button>
              
              <div className="flex space-x-1">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-3 py-2 text-sm font-medium rounded-lg ${
                      currentPage === i + 1
                        ? 'bg-orange-500 text-white'
                        : 'bg-white text-gray-500 hover:bg-gray-50 border border-gray-300'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-500 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="hidden sm:inline">Next</span>
                <span className="sm:hidden">Next</span>
                <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredBookings.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 md:p-12 text-center">
            <div className="text-gray-400 mb-4">
              <Search className="w-8 h-8 md:w-12 md:h-12 mx-auto" />
            </div>
            <h3 className="text-base md:text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
            <p className="text-sm md:text-base text-gray-500">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminTreckBookings;
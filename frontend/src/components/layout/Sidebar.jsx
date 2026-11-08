/**
 * Sidebar — Điều hướng theo vai trò người dùng (RBAC phía UI).
 * Mỗi role chỉ thấy các trang thuộc phạm vi công việc của mình.
 */
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const NAV_ITEMS = [
  { to: '/', label: 'Tổng quan', roles: ['receptionist', 'service_manager', 'mechanic', 'warehouse_staff', 'admin'] },
  { to: '/reception', label: 'Tiếp nhận xe', roles: ['receptionist'] },
  { to: '/repair-jobs', label: 'Phiếu sửa chữa', roles: ['receptionist', 'service_manager', 'admin'] },
  { to: '/vehicle-history', label: 'Lịch sử sửa chữa', roles: ['receptionist', 'service_manager', 'admin'] },
  { to: '/task-board', label: 'Bảng công việc', roles: ['mechanic'] },
  { to: '/inventory', label: 'Kho phụ tùng', roles: ['warehouse_staff', 'service_manager', 'receptionist', 'admin'] },
  { to: '/customers', label: 'Khách hàng', roles: ['receptionist', 'admin'] },
  { to: '/vehicles', label: 'Quản lý xe', roles: ['receptionist', 'admin'] },
  { to: '/admin/roles', label: 'Vai trò & phân quyền', roles: ['admin'] },
  { to: '/portal', label: 'Theo dõi sửa chữa', roles: ['customer'] },
];

export default function Sidebar() {
  const { user } = useAuth();
  const items = NAV_ITEMS.filter((it) => user && it.roles.includes(user.role));

  return (
    <aside className="app-sidebar" aria-label="Điều hướng chính">
      <div className="sidebar-brand">
        <div className="brand-mark" aria-hidden="true">G</div>
        <div className="sidebar-brand-copy">
          <strong>Garage</strong>
          <span>Workshop · RO System</span>
        </div>
      </div>

      <p className="sidebar-section-label">Chức năng</p>
      <nav aria-label="Khu vực làm việc">
        {items.map((it, index) => (
          <NavLink
            key={it.to}
            to={it.to}
            end={it.to === '/'}
            className={({ isActive }) => `sidebar-link${isActive ? ' is-active' : ''}`}
          >
            <span className="sidebar-code" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
            <span>{it.label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="sidebar-footer">
        <strong>Automotive Repair</strong>
        Nhóm 12 · Quản lý xưởng
      </div>
    </aside>
  );
}

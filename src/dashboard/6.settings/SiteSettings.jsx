import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '../../components/common/Button';
import { useAuth } from '../../context/useAuth';
import { useUpdateAccount, useChangePassword } from '../../services/accountQueries';
import { useToast } from '../../context/useToast';
import { FIELD, ERROR_FIELD, LABEL, PANEL, GROUP_HEADING } from '../components/formStyles';

const detailsSchema = yup.object({
  name: yup.string().trim().required('Name is required.'),
  email: yup.string().trim().email('Enter a valid email.').required('Email is required.'),
});

const passwordSchema = yup.object({
  currentPassword: yup.string().required('Current password is required.'),
  newPassword: yup.string().min(8, 'New password must be at least 8 characters.').required('New password is required.'),
  confirmNewPassword: yup
    .string()
    .oneOf([yup.ref('newPassword')], 'Passwords do not match.')
    .required('Confirm your new password.'),
});

export default function SiteSettings() {
  const { user, updateUser } = useAuth();
  const updateAccount = useUpdateAccount();
  const changePassword = useChangePassword();
  const { addToast } = useToast();

  const detailsForm = useFormik({
    enableReinitialize: true,
    initialValues: { name: user?.name || '', email: user?.email || '' },
    validationSchema: detailsSchema,
    onSubmit: (values) => {
      updateAccount.mutate(
        { name: values.name.trim(), email: values.email.trim() },
        {
          onSuccess: (data) => {
            updateUser(data);
            addToast('Account details updated', 'success');
          },
          onError: (err) => addToast(err.response?.data?.message || err.message || 'Failed to update account', 'error'),
        },
      );
    },
  });

  const passwordForm = useFormik({
    initialValues: { currentPassword: '', newPassword: '', confirmNewPassword: '' },
    validationSchema: passwordSchema,
    onSubmit: (values, { resetForm }) => {
      changePassword.mutate(
        { currentPassword: values.currentPassword, newPassword: values.newPassword },
        {
          onSuccess: () => {
            addToast('Password changed', 'success');
            resetForm();
          },
          onError: (err) => addToast(err.response?.data?.message || err.message || 'Failed to change password', 'error'),
        },
      );
    },
  });

  const detailsErr = (name) => (detailsForm.touched[name] && detailsForm.errors[name] ? detailsForm.errors[name] : '');
  const passwordErr = (name) => (passwordForm.touched[name] && passwordForm.errors[name] ? passwordForm.errors[name] : '');

  return (
    <div className="max-w-2xl">
      <header className="mb-8">
        <h1 className="font-display text-3xl text-forest-900">Account</h1>
        <p className="mt-1 text-sm text-navy-900/60">Manage your name, email, and password.</p>
      </header>

      <div className="space-y-8">
        <form onSubmit={detailsForm.handleSubmit} className={PANEL}>
          <h3 className={GROUP_HEADING}>Account Details</h3>
          <div className="space-y-4">
            <div>
              <label className={LABEL}>Name</label>
              <input
                name="name"
                value={detailsForm.values.name}
                onChange={detailsForm.handleChange}
                onBlur={detailsForm.handleBlur}
                className={`${FIELD} ${detailsErr('name') ? ERROR_FIELD : ''}`}
              />
              {detailsErr('name') && <p className="mt-1 text-xs text-error">{detailsErr('name')}</p>}
            </div>
            <div>
              <label className={LABEL}>Email</label>
              <input
                name="email"
                type="email"
                value={detailsForm.values.email}
                onChange={detailsForm.handleChange}
                onBlur={detailsForm.handleBlur}
                className={`${FIELD} ${detailsErr('email') ? ERROR_FIELD : ''}`}
              />
              {detailsErr('email') && <p className="mt-1 text-xs text-error">{detailsErr('email')}</p>}
            </div>
            <Button type="submit" variant="primary" disabled={updateAccount.isPending}>
              {updateAccount.isPending ? 'Saving…' : 'Save Details'}
            </Button>
          </div>
        </form>

        <form onSubmit={passwordForm.handleSubmit} className={PANEL}>
          <h3 className={GROUP_HEADING}>Change Password</h3>
          <div className="space-y-4">
            <div>
              <label className={LABEL}>Current password</label>
              <input
                name="currentPassword"
                type="password"
                autoComplete="current-password"
                value={passwordForm.values.currentPassword}
                onChange={passwordForm.handleChange}
                onBlur={passwordForm.handleBlur}
                className={`${FIELD} ${passwordErr('currentPassword') ? ERROR_FIELD : ''}`}
              />
              {passwordErr('currentPassword') && <p className="mt-1 text-xs text-error">{passwordErr('currentPassword')}</p>}
            </div>
            <div>
              <label className={LABEL}>New password</label>
              <input
                name="newPassword"
                type="password"
                autoComplete="new-password"
                value={passwordForm.values.newPassword}
                onChange={passwordForm.handleChange}
                onBlur={passwordForm.handleBlur}
                className={`${FIELD} ${passwordErr('newPassword') ? ERROR_FIELD : ''}`}
              />
              {passwordErr('newPassword') && <p className="mt-1 text-xs text-error">{passwordErr('newPassword')}</p>}
            </div>
            <div>
              <label className={LABEL}>Confirm new password</label>
              <input
                name="confirmNewPassword"
                type="password"
                autoComplete="new-password"
                value={passwordForm.values.confirmNewPassword}
                onChange={passwordForm.handleChange}
                onBlur={passwordForm.handleBlur}
                className={`${FIELD} ${passwordErr('confirmNewPassword') ? ERROR_FIELD : ''}`}
              />
              {passwordErr('confirmNewPassword') && <p className="mt-1 text-xs text-error">{passwordErr('confirmNewPassword')}</p>}
            </div>
            <Button type="submit" variant="primary" disabled={changePassword.isPending}>
              {changePassword.isPending ? 'Saving…' : 'Change Password'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

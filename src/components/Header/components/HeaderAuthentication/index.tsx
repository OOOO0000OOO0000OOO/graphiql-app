import { logout, auth } from 'helpers';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { TbLogout } from 'react-icons/tb';
import { Button } from 'react-bootstrap';
import { Paths } from 'assets';
import styles from './HeaderAuthentication.module.scss';

export const HeaderAuthentication = ({ className }: { className: string }) => {
  const [user, loading] = useAuthState(auth);

  const navigate = useNavigate();

  const { t } = useTranslation();

  const { pathname } = useLocation();
  const isAuthPage = pathname === Paths.AUTH;

  if (user) return <TbLogout className={styles.logout} onClick={logout} title="Log out" />;

  if (!isAuthPage && !loading)
    return (
      <div>
        <Button
          className={`border-0 ${className}`}
          size="sm"
          variant=""
          onClick={() => navigate(Paths.AUTH)}
        >
          {t('Header sign in')}
        </Button>
        <Button size="sm" className={className} onClick={() => navigate(Paths.SIGNUP)}>
          {t('Header sign up')}
        </Button>
      </div>
    );

  return null;
};

import Link from '@components/button/link';
import { config } from '@utils/config';
import { StyledHeaderLogo } from './style';

const HeaderLogo = () => (
    <Link href={config.NEXT_PUBLIC_BASE_URL as string}>
        <StyledHeaderLogo>Waves</StyledHeaderLogo>
    </Link>
);

export default HeaderLogo;

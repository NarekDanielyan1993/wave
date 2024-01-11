import { useAppSelector } from '@store/create-store';
import { siteSelector } from '@store/site/selectors';
import BusinessInfoDetail from './businessInfo/index';
import {
    StyledBusinessInfoContent,
    StyledBusinessInfoTitle,
    StyledFooterContactsReachOut,
} from './style';

const BusinessDetails = () => {
    const { site } = useAppSelector(siteSelector);
    return (
        <>
            <StyledBusinessInfoTitle>
                Contact Information
            </StyledBusinessInfoTitle>
            <StyledBusinessInfoContent>
                <StyledFooterContactsReachOut>
                    {site.address && (
                        <BusinessInfoDetail
                            iconName="address"
                            label="address"
                            text={site.address}
                        />
                    )}
                    {site.hours && (
                        <BusinessInfoDetail
                            iconName="business"
                            label="working hours"
                            text={site.hours}
                        />
                    )}
                </StyledFooterContactsReachOut>
                <StyledFooterContactsReachOut>
                    {site.phone && (
                        <BusinessInfoDetail
                            iconName="phone"
                            label="phone"
                            text={site.phone}
                        />
                    )}
                    {site.email && (
                        <BusinessInfoDetail
                            iconName="email"
                            label="email"
                            text={site.email}
                        />
                    )}
                </StyledFooterContactsReachOut>
            </StyledBusinessInfoContent>
        </>
    );
};

export default BusinessDetails;

import { Button } from '@chakra-ui/react';
import useForm from '@hooks/useForm';
import { useAppDispatch, useAppSelector } from '@store/create-store';
import { createSite, editSite } from '@store/site/action';
import { siteSelector } from '@store/site/selectors';
import {
    siteCreateValidationSchema,
    siteCreateValidationSchemaTypes,
} from 'common/validation/site';

const SiteForm = () => {
    const dispatch = useAppDispatch();
    const { site } = useAppSelector(siteSelector);
    const { FormField, handleSubmit } =
        useForm<siteCreateValidationSchemaTypes>({
            defaultValues: {
                hours: site.hours || '',
                address: site.address || '',
                phone: site.phone || '',
                email: site.email || '',
            },
            validationSchema: siteCreateValidationSchema,
        });

    const formSubmitHandler = (data: siteCreateValidationSchemaTypes) => {
        if (site.id) {
            console.log(site.id);
            dispatch(editSite({ id: site.id, site: data }));
        } else {
            dispatch(createSite({ site: data }));
        }
    };

    return (
        <form onSubmit={handleSubmit(formSubmitHandler)}>
            {FormField({
                name: 'address',
                label: 'Address',
            })}
            {FormField({
                name: 'email',
                label: 'Email',
            })}
            {FormField({
                name: 'phone',
                label: 'Phone',
            })}
            {FormField({
                name: 'hours',
                label: 'Hours',
            })}
            <Button type="submit" variant="primary">
                edit site
            </Button>
        </form>
    );
};

export default SiteForm;

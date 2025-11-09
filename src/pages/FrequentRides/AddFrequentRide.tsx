import { Formik, type FormikHelpers } from "formik";
import * as Yup from "yup";
import LoadingButton from "../../components/Form/LoadingButton";
import FormCard from "../../components/Form/FormCard";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useToast } from "../../components/Toast/ToastContext";
import apiInterceptor from "../../hooks/apiInterceptor";
import { api } from "../../hooks/api";
import { useNavigate } from "react-router";
import ComboBox from "../../components/Form/ComboBox";

type FormValues = {
    from: string;
    to: string;
}

const AddFrequentRide = () => {
    const initialValues: FormValues = {
        from: "",
        to: ""
    };
    const { t } = useTranslation();
    const validationSchema = Yup.object().shape({
        from: Yup.object({
            address: Yup.string().required(t("formMessages.fromRequired")),
            lat: Yup.number().required(),
            lng: Yup.number().required(),
        }).required(t("formMessages.fromRequired")),
        to: Yup.object({
            address: Yup.string().required(t("formMessages.toRequired")),
            lat: Yup.number().required(),
            lng: Yup.number().required(),
        }).required(t("formMessages.toRequired")),
    });
    const [isLoading, setIsLoading] = useState(false);
    const { showToast } = useToast();
    const navigate = useNavigate();

    const handleCreateFrequentRide = async (payload: any) => {
        try {
            setIsLoading(true);
            await apiInterceptor.post(api.admin.createFrequentRide, payload);
            showToast("success", t("messages.frequentRideSuccess"));
            navigate("/frequent-rides");
        } catch (err) {
            console.error("Error creating frequent ride:", err);
            showToast("error", t("error.server"));
        }
        finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
        setSubmitting(false);
        const payload = { ...values };
        await handleCreateFrequentRide(payload);
    };

    const handleCancel = () => {
        navigate("/frequent-rides");
    }

    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
            {({ values, isValid, handleSubmit, setFieldValue }) => {
                return (
                    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-5">
                        <FormCard title="Add Frequent Rides">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                                <ComboBox
                                    label={t("from")}
                                    placeholder={t("startingLocation")}
                                    value={values.from}
                                    onChange={(val) => setFieldValue("from", val)}
                                    onSelect={(option) => setFieldValue("from", {
                                        address: option.address,
                                        lat: option.lat, lng: option.lng,
                                        state: option.state
                                    })}
                                    icon="bi bi-geo-alt-fill"
                                    required
                                />
                                <ComboBox
                                    label={t("to")}
                                    placeholder={t("destinationLocation")}
                                    value={values.to}
                                    onChange={(val) => setFieldValue("to", val)}
                                    onSelect={(option) => setFieldValue("to", {
                                        address: option.address,
                                        lat: option.lat, lng: option.lng,
                                        state: option.state
                                    })}
                                    icon="bi bi-geo-alt-fill"
                                    required
                                />
                            </div>
                            <div className="flex items-center gap-6 justify-end">
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="px-6 py-2 bg-gray-200 hover:cursor-pointer text-gray-700 rounded-md
                                     hover:bg-gray-300 focus:outline-none"
                                >
                                    {t("cancel")}
                                </button>
                                <LoadingButton name="Submit" handleApi={handleSubmit}
                                    disabled={!isValid} isLoading={isLoading}
                                />
                            </div>
                        </FormCard>
                    </form>
                );
            }}
        </Formik>
    )
}
export default AddFrequentRide;
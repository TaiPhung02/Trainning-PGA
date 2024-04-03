import React, { useEffect, useState } from "react";

import { Modal, Skeleton } from "antd";

import { userApi } from "../../services/user-services";
import ImageCrop from "../../components/ImageCrop/ImageCrop";

import "./profileUser.css";
import "react-image-crop/dist/ReactCrop.css";
import { IUserProfile } from "../../interfaces/user-interface";

const ProfileUser = () => {
    //
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userProfile, setUserProfile] = useState<IUserProfile>();
    const [loading, setLoading] = useState(true);

    const fetchDataUser = async () => {
        try {
            const response = await userApi();
            setUserProfile(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            fetchDataUser();
        }, 1000);
        return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {
        console.log("User profile updated:", userProfile);
    }, [userProfile]);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="profileUser">
            <div className="profileUser__loading">
                <Skeleton
                    loading={loading}
                    active
                    avatar
                    paragraph={{ rows: 5, width: [400, 400, 400, 400, 400] }}
                />
            </div>
            {!loading && (
                <div className="profileUser__row">
                    <div className="profileUser__image">
                        <img
                            onClick={showModal}
                            src={`http://api.training.div3.pgtest.co/${userProfile?.avatar}`}
                            alt="Avatar"
                        />
                        <Modal
                            title="ImageCrop"
                            open={isModalOpen}
                            onOk={handleOk}
                            onCancel={handleCancel}
                            footer
                        >
                            <ImageCrop></ImageCrop>
                        </Modal>
                    </div>
                    <div className="profileUser__content">
                        <h2 className="profileUse__name">
                            <strong>Username: </strong>
                            {userProfile?.name}
                        </h2>
                        <p className="profileUser__desc">
                            <strong>Email: </strong>
                            {userProfile?.email}
                        </p>
                        <p className="profileUser__desc">
                            <strong>Gender: </strong>
                            {userProfile?.gender}
                        </p>
                        <p className="profileUser__desc">
                            <strong>Description: </strong>
                            {userProfile?.description
                                ? "userProfile?.description"
                                : "No bio yet"}
                        </p>
                        <p className="profileUser__desc">
                            <strong>Region: </strong>
                            {userProfile?.region}
                        </p>
                        <p className="profileUser__desc">
                            <strong>State: </strong>
                            {userProfile?.state}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileUser;

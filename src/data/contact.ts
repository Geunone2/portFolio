import {FaEnvelope, FaGithub, FaPhone} from "react-icons/fa";
import type {ContactItem} from "../types";

export const CONTACT_DATA: ContactItem[] = [
    {
        icon: FaGithub,
        label: "GitHub",
        value: "https://github.com/geunone2",
        link: "https://github.com/geunone2"
    },
    {
        icon: FaEnvelope,
        label: "Email",
        value: "rmsdnjsaos@gmail.com",
        link: "mailto:rmsdnjsaos@gmail.com"
    },
    {
        icon: FaPhone,
        label: "Phone",
        value: "010-3099-4426",
        link: "tel:010-3099-4426"
    }
];
import {FaEnvelope, FaPhone, FaBrain, FaUser, FaGraduationCap, FaBirthdayCake} from "react-icons/fa";
import type {ProfileItem} from "../types";

export const INFO_DATA: ProfileItem[] = [
    {icon: FaUser, label: "이름", value: "박근원"},
    {icon: FaBirthdayCake, label: "생년월일", value: "2000.11.08"},
    {icon: FaBrain, label: "MBTI", value: "ISTJ"},
    {icon: FaPhone, label: "연락처", value: "010-3099-4426"},
    {icon: FaEnvelope, label: "이메일", value: "rmsdnjsaos@email.com"},
    {icon: FaGraduationCap, label: "학력", value: "한밭대학교 정보통신공학과"},
];
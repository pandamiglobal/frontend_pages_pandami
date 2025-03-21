"use client"

import { Container } from "@/components/ui/container"
import { motion } from "framer-motion"
import { Search, Clock, Shield, Award } from "lucide-react"

const features = [
    {
        icon: (
            <svg width="49" height="49" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.666 24.4707L22.666 28.4707L30.666 20.4707M40.666 26.4706C40.666 36.4706 33.666 41.4706 25.346 44.3706C24.9103 44.5183 24.4371 44.5112 24.006 44.3506C15.666 41.4706 8.66602 36.4706 8.66602 26.4706V12.4706C8.66602 11.9402 8.87673 11.4315 9.2518 11.0564C9.62688 10.6813 10.1356 10.4706 10.666 10.4706C14.666 10.4706 19.666 8.07063 23.146 5.03063C23.5697 4.66862 24.1087 4.46973 24.666 4.46973C25.2233 4.46973 25.7623 4.66862 26.186 5.03063C29.686 8.09063 34.666 10.4706 38.666 10.4706C39.1964 10.4706 39.7052 10.6813 40.0802 11.0564C40.4553 11.4315 40.666 11.9402 40.666 12.4706V26.4706Z" stroke="#3C56F0" stroke-width="3" stroke-linecap="round" strokeLinejoin="round" />
            </svg>
        ),
        title: "Segurança jurídica",
        description: "Evite conflitos futuros com marcas já registradas e proteja seu negócio de problemas legais.",
    },
    {
        icon: (
            <svg width="48" height="49" viewBox="0 0 48 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M29 17.4707C27.4386 17.0659 25.2687 16.4707 23.5293 16.4707C14.9527 16.4707 8 21.806 8 28.3874C8 32.1693 10.2959 35.5398 13.8765 37.7228L12.6717 41.6966C12.5548 42.0819 12.8432 42.4707 13.2458 42.4707H17.783C17.9129 42.4707 18.0393 42.4286 18.1432 42.3506L21.0924 40.1374H25.9663L28.9155 42.3506C29.0194 42.4286 29.1457 42.4707 29.2756 42.4707H33.8128C34.2155 42.4707 34.5038 42.0819 34.387 41.6966L33.1822 37.7228C35.3154 36.4222 36.9926 34.7002 38 32.7207" stroke="#3C56F0" stroke-width="3" stroke-linecap="round" strokeLinejoin="round" />
                <path d="M29 17.4707L38 14.4707L37.832 21.7273L42 23.4707V30.4707L38.1482 32.4707" stroke="#3C56F0" stroke-width="3" stroke-linecap="round" strokeLinejoin="round" />
                <path d="M31 26.4707C30.4477 26.4707 30 26.023 30 25.4707C30 24.9184 30.4477 24.4707 31 24.4707C31.5523 24.4707 32 24.9184 32 25.4707C32 26.023 31.5523 26.4707 31 26.4707Z" fill="#3C56F0" stroke="#3C56F0" stroke-width="3" stroke-linecap="round" strokeLinejoin="round" />
                <path d="M4 20.4707C4 20.4707 4 25.2707 8 26.4707" stroke="#3C56F0" stroke-width="3" stroke-linecap="round" strokeLinejoin="round" />
                <path d="M25.6017 15.9766C25.8596 15.2333 26 14.4334 26 13.6001C26 9.66266 22.866 6.4707 19 6.4707C15.134 6.4707 12 9.66266 12 13.6001C12 15.4835 12.717 17.1962 13.8881 18.4707" stroke="#3C56F0" stroke-width="3" strokeLinejoin="round" />
            </svg>

        ),
        title: "Proteção do seu investimento",
        description: "Criar uma marca demanda tempo e dinheiro. A consulta garante exclusividade e aumenta o valor percebido pelo mercado.",
    },
    {
        icon: (
            <svg width="49" height="49" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.33203 40.4707V31.4707C4.33203 27.6047 7.46604 24.4707 11.332 24.4707H18.332" stroke="#3C56F0" stroke-width="3" stroke-linecap="round" strokeLinejoin="round" />
                <path d="M32.8533 24.0944C33.6467 23.2233 35.0174 23.2233 35.8107 24.0944L37.1156 25.5273C37.5166 25.9675 38.0929 26.2062 38.6877 26.1784L40.6236 26.0879C41.8006 26.0329 42.7698 27.0022 42.7148 28.1791L42.6243 30.115C42.5965 30.7099 42.8352 31.2861 43.2755 31.6871L44.7083 32.992C45.5795 33.7854 45.5795 35.1561 44.7083 35.9494L43.2755 37.2543C42.8352 37.6553 42.5965 38.2315 42.6243 38.8264L42.7148 40.7623C42.7698 41.9392 41.8006 42.9085 40.6236 42.8535L38.6877 42.763C38.0929 42.7352 37.5166 42.9739 37.1156 43.4142L35.8107 44.847C35.0174 45.7182 33.6467 45.7182 32.8533 44.847L31.5484 43.4142C31.1475 42.9739 30.5712 42.7352 29.9764 42.763L28.0405 42.8535C26.8635 42.9085 25.8943 41.9392 25.9493 40.7623L26.0397 38.8264C26.0675 38.2315 25.8288 37.6553 25.3886 37.2543L23.9557 35.9494C23.0846 35.1561 23.0846 33.7854 23.9557 32.992L25.3886 31.6871C25.8288 31.2861 26.0675 30.7099 26.0397 30.115L25.9493 28.1791C25.8943 27.0022 26.8635 26.0329 28.0405 26.0879L29.9764 26.1784C30.5712 26.2062 31.1475 25.9675 31.5484 25.5272L32.8533 24.0944Z" stroke="#3C56F0" stroke-width="3" />
                <path d="M31.0586 34.4707L33.2404 36.6525L37.604 32.2889" stroke="#3C56F0" stroke-width="3" stroke-linecap="round" strokeLinejoin="round" />
                <path d="M18.332 24.4707C22.7503 24.4707 26.332 20.889 26.332 16.4707C26.332 12.0524 22.7503 8.4707 18.332 8.4707C13.9138 8.4707 10.332 12.0524 10.332 16.4707C10.332 20.889 13.9138 24.4707 18.332 24.4707Z" stroke="#3C56F0" stroke-width="3" stroke-linecap="round" strokeLinejoin="round" />
            </svg>
        ),
        title: "Fortalecimento da estratégia de branding",
        description: "Conheça as marcas concorrentes, ajuste sua identidade visual e posicione-se de forma mais competitiva.",
    },
    {
        icon: (
            <svg width="49" height="49" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M40.666 24.4707V11.7192C40.666 11.5601 40.6028 11.4075 40.4903 11.295L33.8418 4.64644C33.7292 4.53392 33.5766 4.4707 33.4175 4.4707H9.26602C8.93464 4.4707 8.66602 4.73933 8.66602 5.0707V43.8707C8.66602 44.2021 8.93464 44.4707 9.26602 44.4707H22.666" stroke="#3C56F0" stroke-width="3" stroke-linecap="round" strokeLinejoin="round" />
                <path d="M16.666 20.4707H32.666M16.666 12.4707H24.666M16.666 28.4707H22.666" stroke="#3C56F0" stroke-width="3" stroke-linecap="round" strokeLinejoin="round" />
                <path d="M36.5747 34.3498L38.5747 32.3498C39.4505 31.474 40.8704 31.474 41.7462 32.3498V32.3498C42.622 33.2256 42.622 34.6455 41.7462 35.5213L39.7462 37.5213M36.5747 34.3498L30.3618 40.5626C30.2119 40.7125 30.1135 40.9062 30.0809 41.1156L29.5452 44.5508L32.9802 44.0152C33.1897 43.9826 33.3834 43.8842 33.5333 43.7343L39.7462 37.5213M36.5747 34.3498L39.7462 37.5213" stroke="#3C56F0" stroke-width="3" stroke-linecap="round" strokeLinejoin="round" />
                <path d="M32.666 4.4707V11.8707C32.666 12.2021 32.9346 12.4707 33.266 12.4707H40.666" stroke="#3C56F0" stroke-width="3" stroke-linecap="round" strokeLinejoin="round" />
            </svg>
        ),
        title: "Registro formal e direitos exclusivos",
        description: "Acesso a toda base de dados do INPI para uma verificação completa.",
    },
    {
        icon: (
            <svg width="48" height="49" viewBox="0 0 48 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 44.4707C35.0457 44.4707 44 35.5164 44 24.4707C44 13.425 35.0457 4.4707 24 4.4707C12.9543 4.4707 4 13.425 4 24.4707C4 35.5164 12.9543 44.4707 24 44.4707Z" stroke="#3C56F0" stroke-width="3" stroke-linecap="round" strokeLinejoin="round" />
                <path d="M27 18.8121C26.3744 18.591 25.7013 18.4707 25 18.4707C21.6863 18.4707 19 21.157 19 24.4707C19 27.7844 21.6863 30.4707 25 30.4707C25.7013 30.4707 26.3744 30.3504 27 30.1293" stroke="#3C56F0" stroke-width="3" stroke-linecap="round" strokeLinejoin="round" />
            </svg>
        ),
        title: "Prevenção contra plágios e concorrência desleal",
        description: "Obtenha informações sobre sua marca em questão de segundos.",
    },
    {
        icon: (
            <svg width="49" height="49" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.332 18.4707L8.33203 8.4707M8.33203 8.4707V16.4707M8.33203 8.4707H16.332" stroke="#3C56F0" stroke-width="3" stroke-linecap="round" strokeLinejoin="round" />
                <path d="M30.332 18.4707L40.332 8.4707M40.332 8.4707V16.4707M40.332 8.4707H32.332" stroke="#3C56F0" stroke-width="3" stroke-linecap="round" strokeLinejoin="round" />
                <path d="M18.332 30.4707L8.33203 40.4707M8.33203 40.4707V32.4707M8.33203 40.4707H16.332" stroke="#3C56F0" stroke-width="3" stroke-linecap="round" strokeLinejoin="round" />
                <path d="M30.332 30.4707L40.332 40.4707M40.332 40.4707V32.4707M40.332 40.4707H32.332" stroke="#3C56F0" stroke-width="3" stroke-linecap="round" strokeLinejoin="round" />
            </svg>
        ),
        title: "Maior segurança para expansão do negócio",
        description: "Identifique possíveis conflitos antes de iniciar o processo de registro.",
    },
]

export function Features() {
    return (
        <section>
            <Container section={true}>
                <ul className="grid place-content grid-cols-1 md:grid-cols-3 w-full gap-6 justify-stretch">
                    {features.map((feature: any, index) => (
                        <li
                            key={feature.title}
                            className="backdrop-blur-md bg-black/5 border border-black/10  text-gray-900 w-[100%] p-6 rounded-xl flex flex-col items-center justify-center min-h-40 gap-[12px]"
                        >
                            {/* <feature.icon className="w-12 h-12 text-[#3C56F0] mb-4" /> */}
                            {feature.icon}
                            <h3 className="text-2 !font-semibold text-gray-900 text-center">{feature.title}</h3>
                            <p className="text-4 text-gray-600 text-center">{feature.description}</p>
                        </li>
                    ))}
                </ul>
            </Container>
        </section>
    )
}
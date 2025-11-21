import { ScanFace, ChartColumnBig, DollarSign, CalendarCheck, MapPin, Globe, ChartPie, Smile, Scissors } from 'lucide-react';

type IconType = 'visagism' | 'crm' | 'booking' | 'affiliated' | 'suggestion' | 'website' | 'dashboard' | 'cutcatalog' | 'faceformat';

interface FeaturesIcon {
    status: IconType;
}

export default function FeaturesIcon({ status }: FeaturesIcon) {
    const configs = {
        visagism: {
            icon: ScanFace,
            bgColor: 'bg-orange-100',
            textColor: 'text-orange-700',
        },
        crm: {
            icon: ChartColumnBig,
            bgColor: 'bg-purple-100',
            textColor: 'text-purple-700',
        },
        booking: {
            icon: CalendarCheck,
            bgColor: 'bg-pink-100',
            textColor: 'text-pink-700',
        },
        affiliated: {
            icon: DollarSign,
            bgColor: 'bg-green-100',
            textColor: 'text-green-700',
        },
        suggestion: {
            icon: MapPin,
            bgColor: 'bg-yellow-100',
            textColor: 'text-yellow-700',
        },
        website: {
            icon: Globe,
            bgColor: 'bg-blue-100',
            textColor: 'text-blue-700',
        },
        dashboard: {
            icon: ChartPie,
            bgColor: 'bg-cyan-100',
            textColor: 'text-cyan-700',
        },
        cutcatalog: {
            icon: Scissors,
            bgColor: 'bg-blue-100',
            textColor: 'text-blue-700',
        },
        faceformat: {
            icon: Smile,
            bgColor: 'bg-green-100',
            textColor: 'text-green-700',
        },
    };

    const config = configs[status];
    const Icon = config.icon;

    return (
        <div className={`py-2 px-2 ${config.bgColor} flex items-center gap-2 rounded-[8px]`}>
            <Icon size={32} className={config.textColor} />
        </div>
    );
}

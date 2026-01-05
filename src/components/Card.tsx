import Link from "next/link";
import { MapPin, Phone, Clock, ChevronRight } from "lucide-react";

interface CardProps {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  address?: string;
  phone?: string;
  hours?: string;
  category?: string;
  href: string;
  image?: string;
}

export default function Card({
  title,
  subtitle,
  description,
  address,
  phone,
  hours,
  category,
  href,
  image,
}: CardProps) {
  return (
    <Link href={href}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
        {/* Image */}
        {image ? (
          <div className="h-48 bg-gray-200">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="h-48 bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center">
            <span className="text-6xl">🏢</span>
          </div>
        )}

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col">
          {/* Category Badge */}
          {category && (
            <span className="inline-block px-2 py-1 text-xs font-semibold text-emerald-700 bg-emerald-100 rounded-full mb-2 w-fit">
              {category}
            </span>
          )}

          {/* Title */}
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>

          {subtitle && <p className="text-sm text-gray-600 mb-2">{subtitle}</p>}

          {description && (
            <p className="text-sm text-gray-500 mb-3 line-clamp-2">
              {description}
            </p>
          )}

          {/* Info */}
          <div className="mt-auto space-y-1">
            {address && (
              <div className="flex items-center text-sm text-gray-500">
                <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                <span className="truncate">{address}</span>
              </div>
            )}
            {phone && (
              <div className="flex items-center text-sm text-gray-500">
                <Phone className="h-4 w-4 mr-2 flex-shrink-0" />
                <span>{phone}</span>
              </div>
            )}
            {hours && (
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
                <span>{hours}</span>
              </div>
            )}
          </div>

          {/* View More */}
          <div className="flex items-center text-emerald-600 text-sm font-medium mt-4">
            View Details
            <ChevronRight className="h-4 w-4 ml-1" />
          </div>
        </div>
      </div>
    </Link>
  );
}

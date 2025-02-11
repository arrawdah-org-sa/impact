import React from 'react';
import { Smartphone, Building, Target } from 'lucide-react';

export function AboutContent() {
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
            <div className="flex items-start gap-4">
              <Smartphone className="w-6 h-6 text-primary-600 mt-1 flex-shrink-0" />
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-3">مهمتنا</h2>
                <p className="text-gray-600 leading-relaxed">
                  نتخصص في إنتاج ونشر جميع المواد التي تعمل على الهاتف الجوال من تطبيقات ومقاطع صوتية ومرئية وغيرها
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Building className="w-6 h-6 text-primary-600 mt-1 flex-shrink-0" />
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-3">من نحن</h2>
                <p className="text-gray-600 leading-relaxed">
                  نحن أحد مشاريع المكتب التعاوني للدعوة والإرشاد بحي الروضة في الرياض
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Target className="w-6 h-6 text-primary-600 mt-1 flex-shrink-0" />
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-3">هدفنا</h2>
                <p className="text-gray-600 leading-relaxed">
                  نسعى لنشر الخير والمعرفة من خلال التقنيات الحديثة، ونهدف إلى الوصول لأكبر شريحة ممكنة من المجتمع
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
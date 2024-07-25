import { Separator } from '@/components/ui/separator'
import { FormCreateCostVariant } from '../_components/form-create-cost-variant'
import TitleDashboard from '@/components/dashboard/title-dashboard'

export default function CreateVariantPage() {
  return (
    <div>
      <TitleDashboard
        title='Create Cost Variant'
        desc='create cost variant page to create new cost variants.'
      />
      <Separator className='my-3' />
      <FormCreateCostVariant />
    </div>
  )
}

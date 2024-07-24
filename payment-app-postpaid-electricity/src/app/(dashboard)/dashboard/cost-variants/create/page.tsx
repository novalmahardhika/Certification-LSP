import { Separator } from '@/components/ui/separator'
import { FormCreateCostVariant } from '../_components/form-create-cost-variant'

export default function CreateVariantPage() {
  return (
    <div>
      <h1 className='text-2xl font-bold'>Create Cost Variants</h1>{' '}
      <Separator className='my-2' />
      <FormCreateCostVariant />
    </div>
  )
}

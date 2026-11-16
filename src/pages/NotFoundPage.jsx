import Button from '../components/Button.jsx'
import EmptyState from '../components/EmptyState.jsx'
import { LeafIcon } from '../components/Icons.jsx'
import { usePageTitle } from '../hooks/usePageTitle.js'

function NotFoundPage() {
  usePageTitle('الصفحة غير موجودة')
  return (
    <div className="container page">
      <EmptyState
        icon={<LeafIcon size={30} />}
        title="الصفحة غير موجودة"
        actions={
          <>
            <Button to="/" variant="secondary">
              العودة إلى الرئيسية
            </Button>
            <Button to="/menu" variant="outline">
              قائمة المشروبات
            </Button>
          </>
        }
      >
        ربما تغيّر الرابط. يمكنك العودة إلى الرئيسية أو تصفّح المشروبات.
      </EmptyState>
    </div>
  )
}

export default NotFoundPage

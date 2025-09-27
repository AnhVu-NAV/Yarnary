import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CollectionShowcase } from "@/components/collection-showcase"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* <Header /> */}
      <main>
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Về Yarnary</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Câu chuyện về hành trình tạo nên những chiếc túi len thủ công đầy tình yêu và sự tỉ mỉ.
            </p>
          </div>
        </div>

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Câu Chuyện Của Chúng Tôi</h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    Yarnary ra đời từ tình yêu dành cho nghệ thuật đan len và mong muốn mang đến những sản phẩm thủ công
                    chất lượng cao. Chúng tôi bắt đầu từ một xưởng nhỏ với vài nghệ nhân tài năng.
                  </p>
                  <p>
                    Ngày nay, Yarnary đã trở thành thương hiệu uy tín trong lĩnh vực túi len thủ công, với đội ngũ nghệ
                    nhân giàu kinh nghiệm và quy trình sản xuất hiện đại.
                  </p>
                  <p>
                    Chúng tôi tin rằng mỗi chiếc túi không chỉ là phụ kiện thời trang mà còn là tác phẩm nghệ thuật,
                    mang trong mình câu chuyện và tình cảm của người tạo ra.
                  </p>
                </div>
              </div>
              <div>
                <img
                  src="/artisan-crafting-knitted-bags-in-workshop.jpg"
                  alt="Nghệ nhân đang làm túi len"
                  className="rounded-2xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        <CollectionShowcase />
      </main>
      {/* <Footer /> */}
    </div>
  )
}

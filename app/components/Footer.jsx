export default function Footer() {
    return (
        <footer className="bg-[#1a1a1a] text-[#ccc]">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1.6fr_1fr_1fr_1fr] lg:px-8">
          <div>
            <div className="font-serif text-2xl text-[#8BAF7C]">Mino Skincare</div>
            <p className="mt-4 text-sm leading-7 text-[#999]">
              Boutique de cosmétiques naturels, mêlant nos produits maison et une sélection de marques partenaires pour une routine de beauté complète.
            </p>
            <div className="mt-6 flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.2em] text-[#777]">
              <span className="rounded-full bg-[#333] px-3 py-1">Visa</span>
              <span className="rounded-full bg-[#333] px-3 py-1">Mastercard</span>
              <span className="rounded-full bg-[#333] px-3 py-1">Mobile Money</span>
            </div>
          </div>

          <div>
            <div className="mb-4 text-xs uppercase tracking-[0.2em] text-white">Boutique</div>
            <ul className="space-y-2 text-sm text-[#999]">
              <li>Alimentation</li>
              <li>Beauté</li>
              <li>Nouveautés</li>
              <li>Promotions</li>
            </ul>
          </div>
          <div>
            <div className="mb-4 text-xs uppercase tracking-[0.2em] text-white">Info</div>
            <ul className="space-y-2 text-sm text-[#999]">
              <li>À propos</li>
              <li>Blog</li>
              <li>FAQ</li>
              <li>Contact</li>
            </ul>
          </div>
          <div>
            <div className="mb-4 text-xs uppercase tracking-[0.2em] text-white">Legal</div>
            <ul className="space-y-2 text-sm text-[#999]">
              <li>CGV</li>
              <li>Confidentialité</li>
              <li>Livraison</li>
              <li>Retours</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[#222] bg-[#111] px-4 py-4 text-xs text-[#555] sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 sm:flex-row">
            <span>© 2026 Mino Skincare — Tous droits réservés</span>
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#333] text-[10px]">f</span>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#333] text-[10px]">in</span>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#333] text-[10px]">ig</span>
            </div>
          </div>
        </div>
      </footer>
    )
}
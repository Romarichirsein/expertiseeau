"use client";

import React from 'react';
import Link from 'next/link';

export default function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = React.use(params);
  const locale = resolvedParams.locale;
  const isFR = locale === 'fr';

  return (
    <main className="bg-white">
      <article className="container mx-auto px-4 py-16 max-w-[800px] text-[#595959] text-center">
        
        {/* Intro */}
        <div className="mb-12">
          <h2 className="text-[20px] font-bold text-[#292929] mb-4">
            {isFR ? "“Les experts de l'eau," : "“Water experts,"}
          </h2>
          <p className="text-[15px] mb-4">
            {isFR ? "partageons et mutualisons nos compétences!" : "let's share and pool our skills!"}
          </p>
          <p className="mb-8">
            <Link href={`/${locale}/login`} className="text-[#34b4e2] hover:text-[#292929] transition-colors">
              <br />
              {isFR ? "Connexion" : "Login"}
              <br />
            </Link>
          </p>
        </div>

        {/* Welcome */}
        <div className="mb-12">
          <h2 className="text-[20px] font-bold text-[#292929] mb-4">{isFR ? "Bienvenue!" : "Welcome!"}</h2>
          <h2 className="text-[20px] font-bold text-[#292929] mb-4">
            {isFR 
              ? "L’eau est une ressource finie, rare et dont la mobilisation nécessite des ressources et une solidarité de tout temps."
              : "Water is a finite, rare resource, the mobilization of which requires resources and constant solidarity."}
          </h2>
          <p className="hidden"><a href="https://fairmontvaltex.net">FAIRMONT VALTEX</a></p>
          <div className="flex justify-center mb-12">
            <img src="/images/expert-resident.jpg" alt="Water" className="max-w-full h-auto w-[550px]" />
          </div>
        </div>

        {/* Resident */}
        <div className="mb-12">
          <h2 className="text-[20px] font-bold text-[#292929] mb-4">{isFR ? "Experts Résident" : "Resident Experts"}</h2>
          <p className="text-[15px] mb-4">
            {isFR ? "« Vous êtes camerounais et vous vivez au cameroun »" : "« You are Cameroonian and you live in Cameroon »"}
          </p>
          <p className="mb-4">
            <Link href={`/${locale}/register`} className="text-[#34b4e2] hover:text-[#292929] transition-colors">
              <br />
              {isFR ? "Enregistrez vous" : "Register now"}
              <br />
            </Link>
          </p>
          <div className="flex justify-center mb-12">
            <img src="/images/expert-diaspora.jpg" alt="Expert Resident" className="max-w-full h-auto w-[550px]" />
          </div>
        </div>

        {/* Diaspora */}
        <div className="mb-12">
          <h2 className="text-[20px] font-bold text-[#292929] mb-4">{isFR ? "Experts Diaspora" : "Diaspora Experts"}</h2>
          <p className="text-[15px] mb-4">
            {isFR ? "« Vous êtes camerounais et vous vivez hors du cameroun »" : "« You are Cameroonian and you live outside Cameroon »"}
          </p>
          <p className="mb-12">
            <Link href={`/${locale}/register`} className="text-[#34b4e2] hover:text-[#292929] transition-colors">
              <br />
              {isFR ? "Enregistrez vous" : "Register now"}
              <br />
            </Link>
          </p>
        </div>

        {/* Life */}
        <div className="mb-12">
          <h2 className="text-[20px] font-bold text-[#292929] mb-4">
            {isFR ? "L'eau est la vie." : "Water is life."}<br />
            {isFR ? "Nous avons le devoir de prendre soin" : "We have a duty to take care of it"}
          </h2>
          <p className="text-[15px] mb-8">
            {isFR ? "Pour que les générations futurs puissent en profiter au maximum de cela." : "So that future generations can enjoy it to the fullest."}
          </p>
          <div className="flex justify-center mb-12">
            <img src="/images/treatment.jpg" alt="Traitement des eaux" className="max-w-full h-auto" />
          </div>
        </div>

        {/* Domains */}
        <div className="mb-12">
          <h2 className="text-[20px] font-bold text-[#292929] mb-4">{isFR ? "Domaines d'expertise..." : "Areas of expertise..."}</h2>
          <ul className="text-[15px] list-disc list-inside mb-4 text-left inline-block">
            <li>Hydrobiologie</li>
            <li>Qualité de l'eau</li>
            <li>Hydrologie</li>
            <li>Hydrogéologie</li>
            <li>Ingénierie fluviale</li>
            <li>Sciences aquacoles</li>
            <li>Suivi des barrages</li>
            <li>Approvisionnement en eau</li>
            <li>Assainissement liquide</li>
            <li>Station de pompage</li>
            <li>Luttes contre les pollutions</li>
          </ul>
          <p>
            <Link href={`/${locale}/about`} className="text-[#34b4e2] hover:text-[#292929] transition-colors">
              <br />
              Learn More
              <br />
            </Link>
          </p>
        </div>

        {/* Testimonials */}
        <div className="mb-12">
          <h2 className="text-[20px] font-bold text-[#292929] mb-4">Avis des experts</h2>
          <h2 className="text-[20px] font-bold text-[#292929] mb-8">Vos experts vous parlent de leurs expériences</h2>
          
          <div className="space-y-8 mb-8">
            <div>
              <p className="text-[15px] mb-2">Fusce nec tellus sed augue semper porta mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh.</p>
              <img src="https://yoga.oceanwp.org/wp-content/uploads/2016/09/testimonial-1.jpg" alt="Calliope Grey" className="mx-auto rounded-full w-16 h-16 mb-2" />
              <p className="text-[15px]">Calliope Grey<br />Practising for 6 months</p>
            </div>
            
            <div>
              <p className="text-[15px] mb-2">Fusce nec tellus sed augue semper porta mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh.</p>
              <img src="https://yoga.oceanwp.org/wp-content/uploads/2016/09/testimonial-2.jpg" alt="Hector Aldo" className="mx-auto rounded-full w-16 h-16 mb-2" />
              <p className="text-[15px]">Hector Aldo<br />Practising for 2 months</p>
            </div>
            
            <div>
              <p className="text-[15px] mb-2">Fusce nec tellus sed augue semper porta mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh.</p>
              <img src="https://yoga.oceanwp.org/wp-content/uploads/2016/09/testimonial-3.jpg" alt="Silvia Cruz" className="mx-auto rounded-full w-16 h-16 mb-2" />
              <p className="text-[15px]">Silvia Cruz<br />Practising for 4 months</p>
            </div>
          </div>
          
          <p className="text-[15px] uppercase tracking-wider font-bold mb-12">
            ” COMMENCEZ VOTRE JOURNEE AVEC LES CONSEILS DE NOS EXPERTS ”
          </p>
        </div>

        {/* Gallery */}
        <div className="mb-12">
          <h2 className="text-[20px] font-bold text-[#292929] mb-4">Notre galerie</h2>
          <h2 className="text-[20px] font-bold text-[#292929] mb-8">Nos réalisations</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
            {/* Using placeholders for gallery since there are 9 images and I didn't copy them all */}
            {[1, 2, 3, 4].map((i) => (
               <figure key={i} className="mb-4">
                 <div className="w-full h-[250px] bg-gray-200 flex items-center justify-center text-gray-400">Image {i}</div>
                 <figcaption className="text-[13px] text-center mt-2">Réalisation {i}</figcaption>
               </figure>
            ))}
          </div>
        </div>

        {/* Source */}
        <div className="mb-12">
          <h2 className="text-[20px] font-bold text-[#292929] mb-4">L'eau, source de vie?</h2>
          <p className="text-[15px] mb-12">
            Prendre de l'eau, est une priorité majeur sur tout le globe car, un pourcentage élevé est remarqué.
          </p>
        </div>

        {/* Partners */}
        <div className="mb-12">
          <h2 className="text-[20px] font-bold text-[#292929] mb-8">Partenaires</h2>
          <div className="flex flex-col items-center gap-8">
            <figure><img src="/images/partners/unesco.png" alt="unesco" className="h-16 w-auto object-contain" /></figure>
            <figure><img src="/images/partners/minee.png" alt="minee" className="h-16 w-auto object-contain" /></figure>
            <figure><img src="/images/partners/france.png" alt="france" className="h-16 w-auto object-contain" /></figure>
            <figure><img src="/images/partners/un-water.png" alt="un-water" className="h-16 w-auto object-contain" /></figure>
            <figure><img src="/images/partners/gwp.png" alt="gwp" className="h-16 w-auto object-contain" /></figure>
          </div>
        </div>

      </article>
    </main>
  );
}

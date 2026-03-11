
CREATE TABLE public.product_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  image_url text NOT NULL,
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Product images are viewable by everyone"
  ON public.product_images
  FOR SELECT
  TO public
  USING (true);

-- Insert sample images for each product using the existing category images
INSERT INTO public.product_images (product_id, image_url, display_order)
SELECT p.id, p.image_url, 0
FROM public.products p
WHERE p.image_url IS NOT NULL;

-- Add second image variant per product
INSERT INTO public.product_images (product_id, image_url, display_order)
SELECT p.id,
  CASE
    WHEN p.image_url LIKE '%alternador-1%' THEN '/products/alternador-2.jpg'
    WHEN p.image_url LIKE '%alternador-2%' THEN '/products/alternador-1.jpg'
    WHEN p.image_url LIKE '%arranque-1%' THEN '/products/arranque-2.jpg'
    WHEN p.image_url LIKE '%arranque-2%' THEN '/products/arranque-1.jpg'
    WHEN p.image_url LIKE '%electrico-1%' THEN '/products/electrico-2.jpg'
    WHEN p.image_url LIKE '%electrico-2%' THEN '/products/electrico-1.jpg'
    WHEN p.image_url LIKE '%minero-1%' THEN '/products/minero-2.jpg'
    WHEN p.image_url LIKE '%minero-2%' THEN '/products/minero-1.jpg'
    ELSE p.image_url
  END,
  1
FROM public.products p
WHERE p.image_url IS NOT NULL;

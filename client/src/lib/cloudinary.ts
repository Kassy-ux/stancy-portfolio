type CloudinaryFit = 'fill' | 'limit';

interface CloudinaryImageOptions {
  width: number;
  height?: number;
  fit?: CloudinaryFit;
}

const CLOUDINARY_UPLOAD_SEGMENT = '/image/upload/';

/**
 * Keeps Cloudinary delivery direct-to-browser while requesting an appropriately
 * sized, automatically formatted and compressed image. Non-Cloudinary URLs are
 * deliberately returned untouched.
 */
export const getOptimizedImageUrl = (
  source: string,
  { width, height, fit = 'limit' }: CloudinaryImageOptions,
): string => {
  try {
    const url = new URL(source);
    if (url.hostname !== 'res.cloudinary.com' || !url.pathname.includes(CLOUDINARY_UPLOAD_SEGMENT)) {
      return source;
    }

    const transformations = ['f_auto', 'q_auto', `w_${width}`];
    if (height) transformations.push(`h_${height}`);
    transformations.push(`c_${fit}`);

    url.pathname = url.pathname.replace(
      CLOUDINARY_UPLOAD_SEGMENT,
      `${CLOUDINARY_UPLOAD_SEGMENT}${transformations.join(',')}/`,
    );
    return url.toString();
  } catch {
    return source;
  }
};

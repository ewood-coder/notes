export class Artwork {
  constructor(data) {
    this.id = data.id
    this.slug = data.slug
    this.originalLink = data.originalLink
    this.smallImg = data.imgUrls.small
    this.description = data.description
    this.admirers = data.admirers
    this.color = data.color
  }
}

// slug: String, 
// height: Number, 
// width: Number, 
// originalLink: String, 
// imgUrls: undefined, 
// description: String, 
// altDescription: String, 
// attribution: String, 
// color: String, 
// admirers: undefined, 
// *createdAt: ISO Timestamp (Virtual Added by Database)
// *updatedAt: ISO Timestamp (Virtual Added by Database)

const data = {
  "id": "vjrzHCu0ONk",
  "slug": "a-painting-of-a-landscape-with-a-mountain-in-the-background-vjrzHCu0ONk",
  "height": 4334,
  "width": 5659,
  "originalLink": "https://unsplash.com/photos/a-painting-of-a-landscape-with-a-mountain-in-the-background-vjrzHCu0ONk",
  "imgUrls": {
    "raw": "https://images.unsplash.com/photo-1689259103820-a375e5a30e00?ixid=M3wzMTA1MjZ8MHwxfGNvbGxlY3Rpb258NDIxfGtXRDJkTUN3dnkwfHx8fHwyfHwxNzEzMjkxODAyfA&ixlib=rb-4.0.3",
    "full": "https://images.unsplash.com/photo-1689259103820-a375e5a30e00?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMTA1MjZ8MHwxfGNvbGxlY3Rpb258NDIxfGtXRDJkTUN3dnkwfHx8fHwyfHwxNzEzMjkxODAyfA&ixlib=rb-4.0.3&q=85",
    "regular": "https://images.unsplash.com/photo-1689259103820-a375e5a30e00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzMTA1MjZ8MHwxfGNvbGxlY3Rpb258NDIxfGtXRDJkTUN3dnkwfHx8fHwyfHwxNzEzMjkxODAyfA&ixlib=rb-4.0.3&q=80&w=1080",
    "small": "https://images.unsplash.com/photo-1689259103820-a375e5a30e00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzMTA1MjZ8MHwxfGNvbGxlY3Rpb258NDIxfGtXRDJkTUN3dnkwfHx8fHwyfHwxNzEzMjkxODAyfA&ixlib=rb-4.0.3&q=80&w=400",
    "thumb": "https://images.unsplash.com/photo-1689259103820-a375e5a30e00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzMTA1MjZ8MHwxfGNvbGxlY3Rpb258NDIxfGtXRDJkTUN3dnkwfHx8fHwyfHwxNzEzMjkxODAyfA&ixlib=rb-4.0.3&q=80&w=200",
    "small_s3": "https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1689259103820-a375e5a30e00"
  },
  "description": "Landscape in the Style of Ancient Masters: after Gao Kegong (1248-1310) Date: Ming dynasty (1368–1644), 1642 Artist: Lan Ying Chinese, 1585-c. 1664 https://www.artic.edu/artworks/8209/landscape-in-the-style-of-ancient-masters-after-gao-kegong-1248-1310",
  "altDescription": null,
  "attribution": "Art Institute of Chicago",
  "color": "#d9d9c0",
  "admirers": [
    {
      "id": "660c59c9ef1c2f279a67d970",
      "name": "Ivana B Codin",
      "picture": "https://static.wikia.nocookie.net/mybbukseries/images/0/07/Uma_Kompton.jpg"
    }
  ],
  "cached": true
}
export const generatorData = [
  {
    key: "camera",
    label: "Camera",
    options: [
      {
        label: "Angle",
        options: [
          "Front View",
          "3/4 View",
          "Side View",
          "Top View / Bird View",
          "Low Angle",
          "High Angle",
          "Isometric",
        ],
      },
      {
        label: "Shot Type",
        options: [
          "Extreme Close Up",
          "Close Up",
          "Medium Shot",
          "Wide Shot",
          "Establishing Shot",
        ],
      },
      {
        label: "Camera Movement",
        options: [
          "Static",
          "Pan",
          "Tilt",
          "Dolly In / Out",
          "Truck Left / Right",
          "Orbit",
          "Crane",
          "Handheld",
          "Slow Cinematic Push",
        ],
      },
      {
        label: "Lens / Feel",
        options: [
          "Wide Lens (18mm–24mm)",
          "Standard Lens (35mm–50mm)",
          "Telephoto Lens (85mm+)",
          "Shallow Depth of Field",
          "Deep Focus",
        ],
      },
    ],
  },

  {
    key: "lighting",
    label: "Lighting",
    options: [
      {
        label: "Lighting Style",
        options: [
          "Soft Lighting",
          "Hard Lighting",
          "Cinematic Lighting",
          "Studio Lighting",
          "Natural Daylight",
          "Dramatic Lighting",
          "High Contrast",
          "Low Contrast",
        ],
      },
      {
        label: "Light Direction",
        options: [
          "Front Light",
          "Side Light",
          "Back Light",
          "Rim Light",
          "Top Light",
          "Under Light",
        ],
      },
      {
        label: "Setup",
        options: [
          "Three Point Lighting",
          "Key + Fill",
          "Single Light Source",
          "Volumetric Light",
          "God Rays",
        ],
      },
      {
        label: "Time / Mood",
        options: [
          "Morning Light",
          "Noon",
          "Golden Hour",
          "Sunset",
          "Night",
          "Neon Night",
        ],
      },
    ],
  },

  {
    key: "color",
    label: "Color",
    options: [
      {
        label: "Palette Type",
        options: [
          "Monochrome",
          "Duotone",
          "Analogous",
          "Complementary",
          "Triadic",
        ],
      },
      {
        label: "Tone",
        options: [
          "Warm Tone",
          "Cool Tone",
          "Neutral Tone",
          "Pastel",
          "Muted",
          "Vibrant",
          "Desaturated",
        ],
      },
      {
        label: "Common Schemes",
        options: [
          "Black & White",
          "Earth Tone",
          "Neon Color",
          "Corporate Color",
          "Luxury Gold",
          "Futuristic Blue",
        ],
      },
    ],
  },

  {
    key: "style",
    label: "Style",
    options: [
      {
        label: "Animation Style",
        options: [
          "Realistic",
          "Semi-Realistic",
          "Stylized",
          "Cartoon",
          "Minimalist",
          "Abstract",
        ],
      },
      {
        label: "Design Style",
        options: [
          "Futuristic",
          "Corporate",
          "Bold Creative",
          "Clean Modern",
          "Editorial",
          "Tech",
          "Luxury",
          "Playful",
        ],
      },
      {
        label: "Rendering Style",
        options: [
          "Photorealistic",
          "Clay Render",
          "Toon Shading",
          "Line Art",
          "Flat",
          "Glassmorphism",
          "Neumorphism",
        ],
      },
    ],
  },

  {
    key: "material",
    label: "Material",
    options: [
      {
        label: "Solid Materials",
        options: ["Plastic", "Metal", "Chrome", "Aluminum", "Gold", "Steel"],
      },
      {
        label: "Transparent / Special",
        options: ["Glass", "Frosted Glass", "Acrylic", "Crystal", "Liquid"],
      },
      {
        label: "Soft / Organic",
        options: ["Rubber", "Fabric", "Leather", "Paper", "Cardboard"],
      },
      {
        label: "Surface Finish",
        options: [
          "Matte",
          "Glossy",
          "Semi-Gloss",
          "Rough",
          "Polished",
          "Brushed",
        ],
      },
    ],
  },

  {
    key: "environment",
    label: "Environment / Background",
    options: [
      {
        label: "Background Type",
        options: [
          "White Studio Background",
          "Dark Studio Background",
          "Gradient Background",
          "Abstract Background",
          "Futuristic Room",
          "Minimal Interior",
          "Outdoor",
          "Floating in Space",
        ],
      },
      {
        label: "Motion / Animation",
        options: [
          "Smooth",
          "Snappy",
          "Slow Motion",
          "Fast Motion",
          "Ease In / Ease Out",
          "Linear",
        ],
      },
      {
        label: "Transition",
        options: ["Fade", "Zoom", "Morph", "Swipe", "Spin", "Glitch"],
      },
    ],
  },

  {
    key: "composition",
    label: "Composition",
    options: [
      "Centered",
      "Rule of Thirds",
      "Symmetrical",
      "Asymmetrical",
      "Floating Object",
      "Overlapping Layers",
      "Depth Layering",
    ],
  },

  {
    key: "detail",
    label: "Detail / Enhancer",
    options: [
      "High Detail",
      "Ultra Sharp",
      "4K / 8K",
      "Cinematic Depth",
      "Motion Blur",
      "Film Grain",
      "Noise Free",
      "Clean Render",
      "Realistic Shadow",
      "Reflection",
      "Refraction",
    ],
  },

  {
    key: "output",
    label: "Output / Technical",
    options: [
      "Aspect Ratio 16:9",
      "Aspect Ratio 1:1",
      "Aspect Ratio 9:16",
      "Loop Animation",
      "Seamless",
      "Transparent Background",
      "No Text",
      "No Watermark",
    ],
  },
];

// router.post(`/create-camera-angle`, smf.createSimpleMaster(`camera_angle`, `camera_angle_name`));

// router.post(`/create-camera-shot-type`, smf.createSimpleMaster(`camera_shot_type`, `camera_shot_type_name`));

// router.post(`/create-camera-movement`, smf.createSimpleMaster(`camera_movement`, `camera_movement_name`));

// router.post(`/create-lighting-style`, smf.createSimpleMaster(`lighting_style`, `lighting_style_name`));

// router.post(`/create-lighting-light-direction`, smf.createSimpleMaster(`lighting_light_direction`, `lighting_light_direction_name`));

// router.post(`/create-lighting-setup`, smf.createSimpleMaster(`lighting_setup`, `lighting_setup_name`));

// router.post(`/create-color-palette-type`, smf.createSimpleMaster(`color_palette_type`, `color_palette_type_name`));

// router.post(`/create-color-tone`, smf.createSimpleMaster(`color_tone`, `color_tone_name`));

// router.post(`/create-color-common-scheme`, smf.createSimpleMaster(`color_common_schemes`, `color_common_schemes_name`));

// router.post(`/create-animation-style`, smf.createSimpleMaster(`animation_style`, `animation_style_name`));

// router.post(`/create-design-style`, smf.createSimpleMaster(`design_style`, `design_style_name`));

// router.post(`/create-rendering-style`, smf.createSimpleMaster(`rendering_style`, `rendering_style_name`));

// router.post(`/create-solid-material`, smf.createSimpleMaster(`solid_material`, `solid_material_style`));

// router.post(`/create-transparent-special-material`, smf.createSimpleMaster(`transparent_special_material`, `transparent_special_material_name`));

// router.post(`/create-soft-organic-material`, smf.createSimpleMaster(`soft_organic_material`, `soft_organic_material`));

// router.post(`/create-surface-finish-material`, smf.createSimpleMaster(`surface_finish_material`, `surface_finish_material_name`));

// router.post(`/create-animation-movement-type`, smf.createSimpleMaster(`animation_movement_type`, `animation_movement_type_name`));

// router.post(`/create-animation-feel`, smf.createSimpleMaster(`animation_feel`, `animation_feel_name`));

// router.post(`/create-animation-transition`, smf.createSimpleMaster(`animation_transition`, `animation_transition_name`));

// router.post(`/create-environment-background`, smf.createSimpleMaster(`environment_background`, `environment_background_name`));

// router.post(`/create-composition`, smf.createSimpleMaster(`composition`, `composition_name`));

// router.post(`/create-detail-enhancer`, smf.createSimpleMaster(`detail_enhancer`, `detail_enhancer_name`));

// router.post(`/create-output-technical`, smf.createSimpleMaster(`output_technical`, `output_technical_name`));

// nama_tabel: camera_angle, nama_field: camera_angle_name,
// nama_tabel: camera_shot_type, nama_field: camera_shot_type_name,
// nama_tabel: camera_movement, nama_field: camera_movement_name,
// nama_tabel: lighting_style, nama_field: lighting_style_name,
// nama_tabel: lighting_light_direction, nama_field: lighting_light_direction_name,
// nama_tabel: lighting_setup, nama_field: lighting_setup_name,
// nama_tabel: color_palette_type, nama_field: color_palette_type_name,
// nama_tabel: color_tone, nama_field: color_tone_name,
// nama_tabel: color_common_schemes, nama_field: color_common_schemes_name,
// nama_tabel: animation_style, nama_field: animation_style_name,
// nama_tabel: design_style, nama_field: design_style_name,
// nama_tabel: rendering_style, nama_field: rendering_style_name,
// nama_tabel: solid_material, nama_field: solid_material_style,
// nama_tabel: transparent_special_material, nama_field: transparent_special_material_name,
// nama_tabel: soft_organic_material, nama_field: soft_organic_material,
// nama_tabel: surface_finish_material, nama_field: surface_finish_material_name,
// nama_tabel: animation_movement_type, nama_field: animation_movement_type_name,
// nama_tabel: animation_feel, nama_field: animation_feel_name,
// nama_tabel: animation_transition, nama_field: animation_transition_name,
// nama_tabel: environment_background, nama_field: environment_background_name,
// nama_tabel: composition, nama_field: composition_name,
// nama_tabel: detail_enhancer, nama_field: detail_enhancer_name,
// nama_tabel: output_technical, nama_field: output_technical_name,

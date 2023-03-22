export const postDetail=`
<div class="container-fluid py-5 wow fadeInUp" data-wow-delay="0.1s">
        <div class="container py-5">
            <div class="section-title text-center position-relative pb-3 mb-4 mx-auto" style="max-width: 600px;">
                <h5 class="fw-bold text-primary text-uppercase">Post-It</h5>
                <h1 class="mb-0">Por si quieres ver un mensaje en detalle.</h1>
            </div>
            <div class="sticky-container wall mx-auto">
                <div class="sticky-outer">
                    <div class="sticky">
                        <svg width="0" height="0">
                        <defs>
                            <clipPath id="stickyClip" clipPathUnits="objectBoundingBox">
                            <path
                                d="M 0 0 Q 0 0.69, 0.03 0.96 0.03 0.96, 1 0.96 Q 0.96 0.69, 0.96 0 0.96 0, 0 0"
                                stroke-linejoin="round"
                                stroke-linecap="square"/>
                            </clipPath>
                        </defs>
                        </svg>
                       
                            <time id= "published" class="date" style="font-size: 11px;">
                                
                            </time>
                       
                        <div class="sticky-content" style="font-size: 18px;"> 
                            
                        </div>
                    </div>
                </div>
            </div>
            <br>
            <div class="text-center position-relative pb-3 mb-4 mx-auto"   style= "padding-bottom: 44px;">
                
                    <a class="btn send animated slideInLeft"  href="{% url 'post_edit' pk=post.pk %}">
                    
                    </a>
                
            </div>
        </div>
    </div>`

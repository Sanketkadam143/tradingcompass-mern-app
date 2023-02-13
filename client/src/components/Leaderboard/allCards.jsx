import TopCard from './TopCard';

function Cards() {
    return (
        <div>
            <TopCard
                backgroundColor="#64b5f6"
                backgroundImage="linear-gradient(to right,#FF6F91, #FF9671)"
                avatarSrc="https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos-3.jpg"
                name="Mr.Demo Name 2"
                subName="Rs 20,231,65"
                imageSrc="https://i.postimg.cc/L8FFG0kn/card2.png"

            />
            <TopCard
                backgroundColor="#9575cd"
                backgroundImage="linear-gradient(to right,#B83FAE, #845EC2)"
                avatarSrc="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                name="Mr.Demo Name 1"
                subName="Rs 19,231,65"
                imageSrc="https://i.postimg.cc/yYbk9Bz2/card.png"

            />
            <TopCard
                backgroundColor="#64b5f6"
                backgroundImage="linear-gradient(to right,#FF6F91, #FF9671)"
                avatarSrc="https://thumbs.dreamstime.com/b/businessman-man-white-shirt-costume-red-tie-36358040.jpg"
                name="Mr.Demo Name 3"
                subName="Rs 20,231,65"
                imageSrc="https://i.postimg.cc/DZMt6Cyf/card3.png"

            />
        </div>
    )
}
export default Cards;

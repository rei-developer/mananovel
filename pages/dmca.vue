<template>
  <div class='content-box'>
    <p><span class='title'>Requests Delivery</span></p>
    <p>Take down requests (as <u>plain-text email</u> in English) should be sent to <u>mananovel@protonmail.com</u>
       from
       a verifiable email address (name@yourcompany / yourname.com). If you're sending scanned copies of requests —
       include text in your email.</p>
    <p>We will ignore image-only letters.</p>
    <hr>
    <p><span class='title'>Request Format</span></p>
    <p>Take down requests must contain:</p>
    <ol>
      <li><u>Name, phone number and postal address</u> of person, submitting the request.
        <ul>
          <li>If request is made by a company representative — name, phone and address of company.</li>
        </ul>
      </li>
      <li><u>Proof of the right to act on behalf of the copyright holder</u> (or proof that you personally are
                                                                             the copyright holder), one of the following:
        <ul>
          <li>Link to site where your copyrighted works are hosted / mentioned (not 'free' Web hosting);</li>
          <li><a href='https://www.uspto.gov' target='_blank'>USPTO</a> number, or any other reasonable and
                                                                        verifiable ownership proof.
          </li>
        </ul>
      </li>
      <li><u>Exact and complete URL</u> of content requested for removal.
        <ul>
          <li>We will ignore requests to remove search categories or search keywords. There are no copyrights on
              keywords. Claims that mentioning your 'registered trademark' is copyright infringement (it is not) will
              not get you anywhere.
          </li>
          <li><em>Requests are processed automatically, if there are no exact links in email, it will be deleted.</em>
          </li>
        </ul>
      </li>
      <li><u>The following statements</u>:
        <ul>
          <li>I have a good faith belief that use of the copyrighted materials described above as allegedly infringing
              is not authorized by the copyright owner, its agent, or the law.
          </li>
          <li>I swear, under penalty of perjury, that the information in the notification is accurate and that I am
              the copyright owner or am authorized to act on behalf of the owner of an exclusive right that is allegedly
              infringed.
          </li>
        </ul>
      </li>
    </ol>
    <p>Requests without information described above will be ignored.</p>
    <p>Allow up to 2~4 business days for your request to be processed.</p>
  </div>
</template>

<style lang='less' scoped>
.content-box {
  padding: .5rem;
  color: #333;
  font-size: 13px;
  border-radius: 2px;
  background: #FFF;
  box-shadow: 1px 0 10px rgba(0, 0, 0, .1);
  > p > span.title {
    font-size: 15px;
    font-weight: bold;
  }
}
</style>

<script>
export default {
  name: 'DMCA'
}
</script>

import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { siteName } from '../../config/envConfig';
import { Link } from 'react-router-dom';
import axiosInstance from '../../services/axiosInstance';
import toast from 'react-hot-toast';
import { handleError } from '../../utils/errorHandler';
import { Loader2 } from 'lucide-react';
import { useNewsletterStore } from '../../store/useNewsletterStore';

const placeholderPaths = [
  'M0.88642 59.1426V0.0425761H23.3864C28.0531 0.0425761 31.4198 1.14258 33.4864 3.34258C35.5531 5.54257 36.5864 8.40924 36.5864 11.9426V20.8426C36.5864 24.0426 36.2198 27.0092 35.4864 29.7426C34.7531 32.4759 33.4531 34.6759 31.5864 36.3426C29.7864 38.0092 27.2864 38.8426 24.0864 38.8426H20.2864V59.1426H0.88642ZM2.68642 57.3426H18.5864V36.9426H24.0864C26.8864 36.9426 29.0531 36.2092 30.5864 34.7426C32.1864 33.2759 33.2864 31.3426 33.8864 28.9426C34.5531 26.4759 34.8864 23.7759 34.8864 20.8426V11.9426C34.8864 8.94258 33.9864 6.50924 32.1864 4.64258C30.3864 2.77591 27.4531 1.84258 23.3864 1.84258H2.68642V57.3426ZM3.48642 56.4426V2.74258H23.3864C27.1864 2.74258 29.9198 3.60924 31.5864 5.34257C33.2531 7.00924 34.0864 9.20924 34.0864 11.9426V20.8426C34.0864 23.5759 33.7864 26.1092 33.1864 28.4426C32.5864 30.7092 31.5531 32.5426 30.0864 33.9426C28.6864 35.3426 26.6864 36.0426 24.0864 36.0426H17.6864V56.4426H3.48642ZM17.6864 28.2426H18.5864C19.3198 28.2426 19.8198 27.7759 20.0864 26.8426C20.3531 25.8426 20.4864 24.0092 20.4864 21.3426V15.6426C20.4864 13.3092 20.3531 11.8426 20.0864 11.2426C19.8198 10.6426 19.3198 10.3426 18.5864 10.3426H17.6864V28.2426ZM18.4864 27.3426V11.3426H18.8864C19.2198 11.3426 19.4198 11.6759 19.4864 12.3426C19.6198 12.9426 19.6864 14.4092 19.6864 16.7426V21.3426C19.6864 23.8759 19.5864 25.5092 19.3864 26.2426C19.1864 26.9759 19.0198 27.3426 18.8864 27.3426H18.4864ZM37.9935 59.1426V9.54258H56.9935C61.0601 9.54258 63.9935 10.5092 65.7935 12.4426C67.5935 14.3092 68.4935 16.7426 68.4935 19.7426V26.4426C68.4935 28.1759 68.2601 29.8759 67.7935 31.5426C67.3268 33.2092 66.4601 34.6092 65.1935 35.7426C65.5268 36.2092 65.8601 36.7759 66.1935 37.4426C66.5268 38.1092 66.8268 38.8759 67.0935 39.7426L71.7935 59.1426H37.9935ZM39.6935 57.3426H53.0935V45.7426L53.5935 47.8426C53.7268 48.5092 53.8601 49.1759 53.9935 49.8426C54.1268 50.4426 54.2601 51.0759 54.3935 51.7426L55.4935 57.0426L69.5935 57.3426L65.6935 40.7426C64.6268 38.0759 63.5601 36.3426 62.4935 35.5426C64.3601 34.6092 65.5268 33.3426 65.9935 31.7426C66.5268 30.1426 66.7935 28.3759 66.7935 26.4426V19.7426C66.7935 17.2759 66.0268 15.2759 64.4935 13.7426C62.9601 12.1426 60.4601 11.3426 56.9935 11.3426H39.6935V57.3426ZM40.4935 56.4426V12.2426H56.9935C60.1935 12.2426 62.4601 12.9426 63.7935 14.3426C65.1935 15.7426 65.8935 17.5426 65.8935 19.7426V26.4426C65.8935 28.5759 65.4935 30.4759 64.6935 32.1426C63.8935 33.8092 62.3268 34.9426 59.9935 35.5426C60.9268 35.6759 61.7601 36.0426 62.4935 36.6426C63.2935 37.1759 63.9935 38.4092 64.5935 40.3426L68.4935 56.4426H55.8935C55.6268 54.7092 55.3268 53.0426 54.9935 51.4426C54.7268 49.8426 54.4601 48.3426 54.1935 46.9426C54.1268 46.4759 53.9935 45.7092 53.7935 44.6426C53.5935 43.5759 53.3935 42.4759 53.1935 41.3426C52.9935 40.1426 52.7935 39.1092 52.5935 38.2426C52.4601 37.3759 52.3935 36.9092 52.3935 36.8426H52.2935V56.4426H40.4935ZM52.2935 32.4426H53.1935C53.6601 32.4426 54.0268 32.0426 54.2935 31.2426C54.5601 30.5092 54.6935 28.7092 54.6935 25.8426C54.6935 24.5092 54.6935 23.3426 54.6935 22.3426C54.6935 21.3426 54.6601 20.5759 54.5935 20.0426C54.5268 18.9759 54.1268 18.4426 53.3935 18.4426H52.2935V32.4426ZM53.0935 31.5426V19.3426H53.3935C53.5268 19.3426 53.6601 19.8092 53.7935 20.7426V25.8426C53.7935 27.0426 53.7935 28.0426 53.7935 28.8426C53.7935 29.5759 53.7601 30.1092 53.6935 30.4426C53.5601 31.1759 53.3935 31.5426 53.1935 31.5426H53.0935ZM88.152 60.0426C84.752 60.0426 81.9187 59.5759 79.652 58.6426C77.3854 57.7092 75.6854 56.0426 74.552 53.6426C73.4187 51.2426 72.852 47.8426 72.852 43.4426V21.4426C72.852 16.7759 74.252 13.4759 77.052 11.5426C79.852 9.60924 83.552 8.64258 88.152 8.64258C92.6854 8.64258 96.252 9.60924 98.852 11.5426C101.519 13.4759 102.852 16.7759 102.852 21.4426V43.3426C102.852 47.7426 102.319 51.1759 101.252 53.6426C100.252 56.0426 98.6854 57.7092 96.552 58.6426C94.4187 59.5759 91.6187 60.0426 88.152 60.0426ZM88.152 58.2426C91.2187 58.2426 93.6854 57.8092 95.552 56.9426C97.4854 56.0759 98.8854 54.5759 99.752 52.4426C100.685 50.2426 101.152 47.2092 101.152 43.3426V21.4426C101.152 17.3759 99.9854 14.5426 97.652 12.9426C95.3187 11.2759 92.152 10.4426 88.152 10.4426C84.0187 10.4426 80.7187 11.2759 78.252 12.9426C75.7854 14.5426 74.552 17.3759 74.552 21.4426V43.4426C74.552 47.3092 75.0187 50.3426 75.952 52.5426C76.952 54.6759 78.452 56.1759 80.452 57.0426C82.5187 57.8426 85.0854 58.2426 88.152 58.2426ZM88.152 57.3426C83.8854 57.3426 80.6854 56.4092 78.552 54.5426C76.4187 52.6092 75.352 48.9092 75.352 43.4426V21.4426C75.352 17.7092 76.5187 15.1092 78.852 13.6426C81.1854 12.1092 84.2854 11.3426 88.152 11.3426C91.952 11.3426 94.9187 12.1092 97.052 13.6426C99.252 15.1092 100.352 17.7092 100.352 21.4426V43.3426C100.352 48.8759 99.352 52.6092 97.352 54.5426C95.4187 56.4092 92.352 57.3426 88.152 57.3426ZM88.152 50.4426C88.4187 50.4426 88.652 50.2759 88.852 49.9426C89.052 49.6092 89.152 49.0426 89.152 48.2426V20.9426C89.152 19.9426 89.052 19.3092 88.852 19.0426C88.652 18.7092 88.4187 18.5426 88.152 18.5426C87.752 18.5426 87.452 18.7092 87.252 19.0426C87.052 19.3092 86.952 19.9426 86.952 20.9426V48.2426C86.952 49.0426 87.052 49.6092 87.252 49.9426C87.452 50.2759 87.752 50.4426 88.152 50.4426ZM88.152 49.5426C87.8854 49.5426 87.752 49.1092 87.752 48.2426V20.9426C87.752 19.9426 87.8854 19.4426 88.152 19.4426C88.2854 19.4426 88.352 19.9426 88.352 20.9426V48.2426C88.352 49.1092 88.2854 49.5426 88.152 49.5426ZM104.693 59.1426V9.54258H124.493L125.293 15.7426L126.193 9.54258H145.893V59.1426H104.693ZM106.493 57.3426H118.393V39.9426L120.593 57.3426H129.993L131.093 48.3426C131.226 46.8092 131.393 45.2759 131.593 43.7426C131.793 42.1426 131.993 40.6092 132.193 39.1426V57.3426H144.193V11.3426H127.693L125.293 28.5426L122.993 11.3426H106.493V57.3426ZM107.393 56.4426V12.2426H122.193L125.293 34.7426L128.493 12.2426H143.293V56.4426H133.093V25.6426L129.193 56.4426H121.393L117.593 25.6426V56.4426H107.393ZM147.859 59.1426V9.54258H166.659C170.592 9.54258 173.426 10.5092 175.159 12.4426C176.959 14.3759 177.859 16.8092 177.859 19.7426V27.1426C177.859 29.8759 177.526 32.4092 176.859 34.7426C176.259 37.0759 175.159 38.9426 173.559 40.3426C172.026 41.6759 169.892 42.3426 167.159 42.3426H164.459V59.1426H147.859ZM149.559 57.3426H162.859V40.5426H167.159C169.559 40.5426 171.392 39.9426 172.659 38.7426C173.992 37.4759 174.926 35.8426 175.459 33.8426C175.992 31.7759 176.259 29.5426 176.259 27.1426V19.7426C176.259 17.2759 175.492 15.2759 173.959 13.7426C172.492 12.1426 170.059 11.3426 166.659 11.3426H149.559V57.3426ZM150.359 56.4426V12.2426H166.659C169.792 12.2426 172.026 12.9426 173.359 14.3426C174.692 15.7426 175.359 17.5426 175.359 19.7426V27.1426C175.359 29.3426 175.126 31.4092 174.659 33.3426C174.192 35.2759 173.359 36.8426 172.159 38.0426C170.959 39.1759 169.292 39.7426 167.159 39.7426H161.959V56.4426H150.359ZM161.959 33.2426H162.859C163.392 33.2426 163.792 32.7092 164.059 31.6426C164.259 30.5092 164.359 28.5759 164.359 25.8426C164.359 24.5092 164.359 23.3426 164.359 22.3426C164.359 21.3426 164.326 20.5759 164.259 20.0426C164.192 18.9759 163.792 18.4426 163.059 18.4426H161.959V33.2426ZM162.859 32.3426V19.3426H163.059C163.192 19.3426 163.326 19.8092 163.459 20.7426V25.8426C163.459 27.1092 163.459 28.1759 163.459 29.0426C163.459 29.8426 163.426 30.4759 163.359 30.9426C163.226 31.8759 163.059 32.3426 162.859 32.3426ZM185.29 59.1426V23.1426H179.39V9.54258H207.09V23.1426H201.09V59.1426H185.29ZM186.89 57.3426H199.49V21.4426H205.39V11.3426H180.99V21.4426H186.89V57.3426ZM187.69 56.4426V20.5426H181.79V12.2426H204.59V20.5426H198.69V56.4426H187.69ZM207.997 59.1426L216.197 0.0425761H241.197L249.197 59.1426H207.997ZM209.997 57.3426H226.897L227.497 49.5426H228.997L229.797 57.3426H247.197L239.697 1.84258H217.697L209.997 57.3426ZM210.997 56.4426L218.397 2.74258H238.897L246.097 56.4426H230.497L229.797 48.6426H226.597L226.097 56.4426H210.997ZM226.697 41.6426H229.797L228.297 14.1426L226.697 41.6426ZM227.597 40.7426L228.297 30.0426L228.997 40.7426H227.597ZM250.103 59.1426V9.54258H269.103C273.169 9.54258 276.103 10.5092 277.903 12.4426C279.703 14.3092 280.603 16.7426 280.603 19.7426V26.4426C280.603 28.1759 280.369 29.8759 279.903 31.5426C279.436 33.2092 278.569 34.6092 277.303 35.7426C277.636 36.2092 277.969 36.7759 278.303 37.4426C278.636 38.1092 278.936 38.8759 279.203 39.7426L283.903 59.1426H250.103ZM251.803 57.3426H265.203V45.7426L265.703 47.8426C265.836 48.5092 265.969 49.1759 266.103 49.8426C266.236 50.4426 266.369 51.0759 266.503 51.7426L267.603 57.0426L281.703 57.3426L277.803 40.7426C276.736 38.0759 275.669 36.3426 274.603 35.5426C276.469 34.6092 277.636 33.3426 278.103 31.7426C278.636 30.1426 278.903 28.3759 278.903 26.4426V19.7426C278.903 17.2759 278.136 15.2759 276.603 13.7426C275.069 12.1426 272.569 11.3426 269.103 11.3426H251.803V57.3426ZM252.603 56.4426V12.2426H269.103C272.303 12.2426 274.569 12.9426 275.903 14.3426C277.303 15.7426 278.003 17.5426 278.003 19.7426V26.4426C278.003 28.5759 277.603 30.4759 276.803 32.1426C276.003 33.8092 274.436 34.9426 272.103 35.5426C273.036 35.6759 273.869 36.0426 274.603 36.6426C275.403 37.1759 276.103 38.4092 276.703 40.3426L280.603 56.4426H268.003C267.736 54.7092 267.436 53.0426 267.103 51.4426C266.836 49.8426 266.569 48.3426 266.303 46.9426C266.236 46.4759 266.103 45.7092 265.903 44.6426C265.703 43.5759 265.503 42.4759 265.303 41.3426C265.103 40.1426 264.903 39.1092 264.703 38.2426C264.569 37.3759 264.503 36.9092 264.503 36.8426H264.403V56.4426H252.603ZM264.403 32.4426H265.303C265.769 32.4426 266.136 32.0426 266.403 31.2426C266.669 30.5092 266.803 28.7092 266.803 25.8426C266.803 24.5092 266.803 23.3426 266.803 22.3426C266.803 21.3426 266.769 20.5759 266.703 20.0426C266.636 18.9759 266.236 18.4426 265.503 18.4426H264.403V32.4426ZM265.203 31.5426V19.3426H265.503C265.636 19.3426 265.769 19.8092 265.903 20.7426V25.8426C265.903 27.0426 265.903 28.0426 265.903 28.8426C265.903 29.5759 265.869 30.1092 265.803 30.4426C265.669 31.1759 265.503 31.5426 265.303 31.5426H265.203ZM285.161 59.1426V9.54258H309.161V23.1426H301.061V26.4426H308.461V41.1426H301.061V45.6426H309.161V59.1426H285.161ZM286.761 57.3426H307.561V47.4426H299.461V39.3426H306.861V28.1426H299.461V21.4426H307.561V11.3426H286.761V57.3426ZM287.561 56.4426V12.2426H306.761V20.5426H298.661V29.0426H306.061V38.4426H298.661V48.3426H306.761V56.4426H287.561ZM310.747 59.1426V9.54258H324.047L325.447 11.7426V9.54258H340.047V59.1426H326.147L325.447 56.5426V59.1426H310.747ZM312.447 57.3426H323.847V44.5426L327.347 57.3426H338.447V11.3426H327.047V25.6426L323.547 11.3426H312.447V57.3426ZM313.247 56.4426V12.2426H322.947L327.847 32.8426V12.2426H337.647V56.4426H328.047L322.947 38.0426V56.4426H313.247ZM341.2 59.1426L348.1 9.54258H369.3L376 59.1426H341.2ZM343.2 57.3426H357.4L357.6 54.1426C357.666 53.6092 357.7 53.0759 357.7 52.5426C357.766 51.9426 357.833 51.4092 357.9 50.9426H358.9L359.4 57.3426H374L367.8 11.3426H349.5L343.2 57.3426ZM344.2 56.4426L350.3 12.2426H367L373 56.4426H360.2L359.7 50.0426H357L356.6 56.4426H344.2ZM357 44.2426H359.7L358.4 21.5426L357 44.2426ZM357.9 43.3426L358.3 36.3426C358.3 36.6759 358.333 37.3426 358.4 38.3426C358.466 39.3426 358.533 40.3426 358.6 41.3426C358.733 42.3426 358.8 43.0092 358.8 43.3426H357.9Z',
];
// const placeholderPaths = [
//   'M55.7447 0H15.3191L0 45.5836H18.2979L4.25532 81.7065H16.5957L5.95745 126L34.4681 82.9966L45.9574 126H120V0H104.681L104.255 110.519H58.2979L45.9574 64.5051H28.0851L42.9787 39.1331L61.7021 106.648H99.5745V0H80V94.6075H76.1702L55.7447 0Z',
//   'M167.002 107.746C175.137 107.746 182.109 104.758 186.426 97.4531H207.178C200.371 114.719 186.592 125.676 167.666 125.676C143.594 125.676 124.834 106.916 124.834 82.8438C124.834 59.6016 143.262 39.5137 166.836 39.5137C192.402 39.5137 210 59.9336 210 84.6699C210 85.998 209.834 87.3262 209.834 88.6543H144.424C145.752 101.271 154.717 107.746 167.002 107.746ZM166.836 57.1113C156.543 57.1113 147.744 63.4199 145.088 73.5469H189.414C186.094 62.4238 178.291 57.1113 166.836 57.1113Z',
//   'M244.512 60.2656L261.5 41L294 0V32L255.137 78.6934L291.494 125.344C291.494 125.51 291.66 125.51 291.66 125.676L291.826 125.842H266.758C266.758 125.842 266.758 125.842 266.592 125.676L244.346 97.1211H240.693L205 136.998H186.5L230.068 78.6934L199.5 40H225L225.254 40.3438L240.693 60.2656H244.512Z',
//   'M337.978 126H296.142V0H315.898V39.0137H343L339 54.4531H315.898V109.072H337.978V126Z',
//   'M455.019 39.3457H426.299C419.492 29.8828 409.697 25.4004 398.076 25.4004C377.49 25.4004 361.885 42.998 361.885 63.252C361.885 83.6719 376.826 101.934 398.076 101.934C409.033 101.934 419.16 98.2812 425.469 89.1504H454.189C443.232 113.057 424.805 125.84 398.408 125.84C363.047 125.84 337.48 97.2852 337.48 62.7539C337.48 29.2188 365.039 1.32812 398.574 1.32812C425.469 1.32812 443.896 15.1074 455.019 39.3457Z',
//   'M495.693 39.6777C519.433 39.6777 539.023 58.1055 539.023 82.0117C539.023 106.748 521.094 125.84 496.025 125.84C472.119 125.84 453.359 106.25 453.359 82.5098C453.359 58.9355 472.285 39.6777 495.693 39.6777ZM496.191 106.914C511.133 106.914 519.267 96.123 519.267 81.8457C519.267 68.2324 509.805 58.4375 496.191 58.4375C482.246 58.4375 472.949 68.7305 472.949 82.5098C472.949 96.7871 481.25 106.914 496.191 106.914Z',
//   'M539.023 82.5098C539.023 58.9355 557.617 39.6777 581.357 39.6777C590.488 39.6777 599.453 42.168 606.592 48.3105V0H625.185V125.84H606.592V116.543C599.287 122.354 590.488 125.674 581.357 125.674C557.119 125.674 539.023 106.25 539.023 82.5098ZM582.685 58.6035C569.238 58.6035 558.945 69.5605 558.945 82.8418C558.945 96.9531 569.736 106.748 583.515 106.748C596.963 106.748 605.762 95.791 605.762 83.0078C605.762 69.5605 596.465 58.6035 582.685 58.6035Z',
//   'M666.76 108.138C674.817 108.138 681.722 105.162 685.997 97.8846H706.548C699.807 115.085 686.161 126 667.418 126C643.578 126 625 107.312 625 83.3308C625 60.177 643.249 40.1654 666.596 40.1654C691.915 40.1654 709.343 60.5077 709.343 85.15C709.343 86.4731 709.179 87.7962 709.179 89.1192H644.4C645.716 101.688 654.594 108.138 666.76 108.138ZM666.596 57.6962C656.402 57.6962 647.689 63.9808 645.058 74.0693H688.956C685.668 62.9885 677.94 57.6962 666.596 57.6962Z',
//   'M775.138 110.619V126H700.166V114.092L747.517 55.3808H702.633V40H772.508V51.9077L724.17 110.619H775.138Z',
// ];

const Footer = () => {
  const container = useRef(null);
  const ref = useRef(null);
  const isInView = useInView(ref);
  const { subscribeToNewsletter, isLoading } = useNewsletterStore();

  const variants = {
    visible: i => ({
      translateY: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12,
        duration: 0.4,
        delay: i * 0.03,
      },
    }),
    hidden: { translateY: 200 },
  };

  const [email, setEmail] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    try {
      await subscribeToNewsletter(email);
      setEmail('');
    } catch (error) {
      toast.error(error.message || 'Subscription failed');
    }
  };

  // const handleNewsLetterData = e => {
  //   e.preventDefault();
  //   const formData = new FormData(e.target);
  //   const clientEmail = formData.get('newsletter_email');
  //   console.log(clientEmail); // This is where you handle the email submission
  //   setOpenPopUp(true);
  //   e.target.reset();
  //   setTimeout(() => setOpenPopUp(false), 2000);
  // };

  return (
    <div
      className="relative h-full dark:bg-dark-primary-dark bg-dark-primary sm:pt-14 pt-8 text-white"
      ref={container}
    >
      <div className="sm:container px-4 mx-auto">
        <div className="md:flex justify-between w-full">
          <div>
            <h1 className="h3 font-semibold">
              Let&lsquo;s do great work together
            </h1>
            <div className="pt-2 pb-6 md:w-99">
              <p className="h5 py-4">Sign up for our newsletter*</p>
              <div className="hover-button relative bg-black flex justify-between items-center border-2 overflow-hidden border-white rounded-full text-white hover:text-black md:text-2xl">
                <form
                  onSubmit={handleSubmit}
                  // onSubmit={handleNewsLetterData}
                  className="relative z-2 grid grid-cols-6 w-full h-full "
                >
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    name="email"
                    className="border-none bg-transparent text-slate-50 py-3 px-6 col-span-5"
                    placeholder="Your Email *"
                    required
                  />
                  <button
                    type="submit"
                    className="cursor-pointer w-full bg-white text-white h-full col-span-1"
                  >
                    {isLoading ? (
                      <Loader2
                        className="w-full h-full p-5 animate-spin"
                        size={20}
                        color="#000"
                      />
                    ) : (
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 15 15"
                        fill="none"
                        className="w-full h-[80%]"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                          fill="#000"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="flex gap-10">
            <ul>
              <li className="text-2xl pb-2 text-[#d5e3f1] font-semibold">
                SITEMAP
              </li>
              <li className="text-xl font-medium">
                <Link to="/">Home</Link>
              </li>
              <li className="text-xl font-medium">
                <Link to="/explore">Explore</Link>
              </li>
              <li className="text-xl font-medium">
                <Link to="/blog">Blog</Link>
              </li>
              <li className="text-xl font-medium">
                <Link to="/about">About</Link>
              </li>
              <li className="text-xl font-medium">
                <Link to="/contact">Contact</Link>
              </li>
            </ul>

            <ul>
              <li className="text-2xl pb-2 text-[#d5e3f1] font-semibold">
                SOCIAL
              </li>
              <li className="text-xl font-medium">
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  LinkedIn
                </a>
              </li>
              <li className="text-xl font-medium">
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  Twitter
                </a>
              </li>
              <li className="text-xl font-medium">
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  Instagram
                </a>
              </li>
              <li className="text-xl font-medium">
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-y-2 md:py-4 border-gray-200">
          <motion.svg
            width="776"
            ref={ref}
            height="137"
            viewBox="0 0 376 65"
            fill="none"
            className="sm:h-fit h-20 md:px-8 px-2 footer-logo w-full"
            xmlns="http://www.w3.org/2000/svg"
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            {placeholderPaths.map((path, index) => (
              <motion.path
                key={index}
                custom={index}
                variants={variants}
                d={path}
                fill="#ABBED1"
              />
            ))}
          </motion.svg>
        </div>

        <div className="py-2 text-center">
          <span className="font-medium">
            &copy; {new Date().getFullYear()} {siteName}. All Rights Reserved.
          </span>
        </div>
        {/* <div className="flex md:flex-row flex-col-reverse gap-3 justify-between py-2">
          <span className="font-medium">
            &copy; {new Date().getFullYear()} {siteName}. All Rights Reserved.
          </span>
          <a href="#" className="font-semibold">
            Privacy Policy
          </a>
        </div> */}
      </div>
    </div>
  );
};

export default Footer;
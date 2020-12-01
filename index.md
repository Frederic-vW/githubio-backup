# Resting-state EEG

Multi-channel EEG recordings are often visualized as an array of time series, reflecting the voltage time course at each electrode. The figure below shows 10 seconds of EEG activity, recorded with 30 electrodes. This sample shows typical eyes-closed brain activity in a task-free ("resting-state") condition, with alpha frequency band oscillations (8-12 Hz) over the occipital electrodes (O1, O2).

![eeg_sample](img/eeg_sample3.png)

While temporal patterns like oscillations are clearly seen, the spatial ordering is more difficult to reconstruct visually. Animating a short segment (1.2 seconds) of the same recording, surface electrical activity looks like this:

<!--
<video src="S029R02_avgref_t1000-2000_graph.mp4" width="380" height="380" controls preload></video>
-->
<!--
<video src="S002R02_avgref_t1000-2000_graph.mp4" width="380" height="380" controls preload></video>
-->
<p align="center">
<video src="20080514_t24000-24300_graph_1_30.mp4" width="380" height="380" controls preload></video>
</p>

The animation was slowed down 25 times with regard to real time. In other words, 1.2 seconds real time are expanded to a 30 second animation. Voltage is represented by colour, the blue-red spectrum covers the range [-33 µV, +23 µV]. 

<!--
See more at the [example site](page1.md)
-->

<!--
## Discrete EEG patterns
Adopting a discrete perspective, the sequence 
-->

### EEG microstate analysis
The aim of EEG microstate analysis is to describe the variety of EEG patterns shown above by a small set of representative patterns ([Michel2018](#ref1)).

#### Clustering
These representative EEG topographies (microstates) are computed via a clustering algorithm, whose input are EEG data vectors taken at peaks of the GFP time course. A popular choice in this context is a modified K-means algorithm ([Pascual-Marqui1995](#ref2)). With 30 EEG channels, as shown above, clustering occurs in a 30-dimensional space which is impossible to visualize. A two-dimensional visualization of the clustering is shown below, obtained from the [t-SNE algorithm](https://scikit-learn.org/stable/modules/generated/sklearn.manifold.TSNE.html){:target="_blank" rel="noopener"}.
Each of the four microstates is represented with a different colour (microstate class A: black, B: blue, C: red, D: yellow):

<p align="center">
<img width="400" height="400" src="img/tsne_p100_20080514.png">
</p>
<!--
![tsne_embedding](tsne_p100_20080514.png)
-->

In two dimensions, the data points do not show a nice clustering behaviour. The clustering labels neighbouring data points with the same colour (microstate class), but their separation into four clusters seems a bit arbitrary. This is partially due to the reduction to 2 dimensions, but also due to the continuous nature of EEG topographic patterns, as will be shown below.

The microstates found are labelled ms-A,..., ms-D, following a commonly used convention ([Michel2018](#ref1)):

<p align="center">
<img width="600" height="150" src="img/group_ms30_600.png">
</p>

<!--
<video src="S029R02_avgref_t1000-2000_microstates.mp4" width="760" height="380" controls preload></video>
-->
If we accept these clustering results, the EEG data set can now be represented by a sequence of microstates. Instead of using the voltage values at each of the 30 electrodes and each moment, we use the microstate label (A-D) that best matches the voltage distribution at that time. The similarity between the current EEG vector and each microstate is measured by their *squared* correlation coefficient, thus ignoring polarity.
The 1.2 second EEG segment animated above, for example, is defined by an array of 9000 floating point values (300 samples x 30 channels). The microstate algorithm reduced that to a sequence of 300 microstate labels, something like: AAADABCCBD...
In terms of data compression, 30 floating point values of 64 bit each are reduced to 1 label with 2 bit information (4 labels), or by a factor of 960. Obviously, this factor increases when more electrodes are used.
The whole idea is best shown in an animation (below): the top row shows the GFP time course, with the moving yellow dot indicating the current time point. Below, the same 1.2 sec. EEG segment (1-30 Hz) used above is shown on the left, now spatially interpolated onto a regular 128 x 128 grid, as an approximation to the real voltage distribution across the head surface. The best fitting microstate is shown on the right. Since the algorithm ignores polarity, a microstate matches when its symmetry is similar to the current EEG topography, even when red/blue are inverted. Usually, the fit is best at local GFP peaks.

<!-- A non-interpolated microstate sequence: -->

<!--
<video src="S002R02_avgref_t1000-2000_microstates3_noip.mp4" width="760" height="380" controls preload></video>
-->
<!--
<video src="S002R02_avgref_t1000-2000_microstates_noip.mp4" width="760" height="380" controls preload></video>
-->
<!--
An interpolated microstate sequence:
<video src="S002R02_avgref_t1000-2000_microstates_ip.mp4" width="760" height="380" controls preload></video>
-->
<video src="20080514_t24000-24300_ms_t.mp4" width="760" height="380" controls preload></video>


#### Microstate sequence analysis
Once the multi-channel EEG data set is compressed into the simple microstate label sequence, the main question is: which EEG properties are reflected by a microstate sequence?

##### Shannon entropy
Microstate sequences are often characterized by the 'ratio of time covered', or RTT, of each microstate. When divided by the total time of the recording, this is the same thing as the probability of finding a certain microstate anywhere in that recording.

##### Entropy rate

##### The Markov property

##### Microstate frequency analysis

Time-lagged mutual information:
$$
\begin{align*}
  I(\tau) & = H(X_{t+\tau}) - H(X_{t+\tau} \vert X_{t})
\end{align*}
$$

<p align="center">
<img width="1200" height="300" src="img/AIF_example_20080514.png">
</p>
<!--
![aif_example](AIF_example_20080514.png)
-->

## Continuous EEG patterns
Microstate frequency analysis shows that microstate labels recur periodically, with frequencies related to the EEG alpha frequency. To better understand these oscillatory dynamics, let's have a look at pure alpha frequency-band oscillations.

### Amplitude and phase patterns
At each EEG electrode, amplitude-modulates oscillations are observed. These can be characterized completely by their analytic amplitude and analytic phase.
More information in [Wegner2020](#ref2).

#### Phase rotors

<p align="center">
<video src="20080514_t24000-24300_cont.mp4" width="750" height="250" controls preload></video>
</p>


## References
<a name="ref1">[1]</a> Michel, C.M., Koenig, T. (2018). EEG microstates as a tool for studying the temporal dynamics of whole-brain neuronal networks: A review. NeuroImage 180:577-593. [doi.org/10.1016/j.neuroimage.2017.11.062](doi.org/10.1016/j.neuroimage.2017.11.062){:target="_blank" rel="noopener"}

<a name="ref2">[2]</a> Pascual-Marqui, R.D. , Michel, C.M. , Lehmann, D. (1995). Segmentation of brain electrical activity into microstates: model estimation and validation. IEEE Trans. Biomed. Eng. 42(7):658-665. [10.1109/10.391164](10.1109/10.391164){:target="_blank" rel="noopener"}

<a name="ref3">[3]</a> von Wegner, F., Bauer, S., Rosenow, F., Triesch, J., Laufs, H. (2020). EEG microstate periodicity explained by rotating phase patterns of resting-state alpha oscillations. NeuroImage, Sep 24;224:117372. [doi: 10.1016/j.neuroimage.2020.117372](doi: 10.1016/j.neuroimage.2020.117372){:target="_blank" rel="noopener"} 

<!--
![](eeg_128_loop.gif)
-->

<!--
<script>
  console.log("js-test");
  alert("test!");
</script>
-->

<!--
<p><div id="copypaste" style="display: block;"> Paste your data into the box: 
<input type="text" id="paste-input" placeholder=">>> data here <<<">
</div></p>
<div><button type="button" id="btn-parse" onclick="parseInput();"> Parse input </button></div>
<p><div id="output-sequence-in"><strong>Parsed sequence: </strong></div></p>
<p><div id="output-symbols-parsed"><strong>Parsed symbols: </strong></div></p>
<p><div id="output-symbols-mapped"><strong>Mapped symbols: </strong></div></p>
<p><div id="output-sequence-mapped"><strong>Mapped sequence: </strong></div></p>
-->

<!--
and the mp4 version:
-->

<!--
https://lyk6756.github.io/2016/11/25/write_latex_equations.html
$$
\begin{align*}
  & \phi(x,y) = \phi \left(\sum_{i=1}^n x_ie_i, \sum_{j=1}^n y_je_j \right)
  = \sum_{i=1}^n \sum_{j=1}^n x_i y_j \phi(e_i, e_j) = \\
  & (x_1, \ldots, x_n) \left( \begin{array}{ccc}
      \phi(e_1, e_1) & \cdots & \phi(e_1, e_n) \\
      \vdots & \ddots & \vdots \\
      \phi(e_n, e_1) & \cdots & \phi(e_n, e_n)
    \end{array} \right)
  \left( \begin{array}{c}
      y_1 \\
      \vdots \\
      y_n
    \end{array} \right)
\end{align*}
$$
-->


<!---
[UNSW](https://medicalsciences.med.unsw.edu.au/research/groups/translational-neuroscience-facility)  
and ...  
-->

<!---
![Conformal map](pic2.png)
-->

<!--
You can use the [editor on GitHub](https://github.com/Frederic-vW/Frederic-vW.github.io/edit/master/index.md) to maintain and preview the content for your website in Markdown files.
Whenever you commit to this repository, GitHub Pages will run [Jekyll](https://jekyllrb.com/) to rebuild the pages in your site, from the content in your Markdown files.
Absolute links:
Try the code for yourself (opens in new window): [online analysis](analyze.html){:target="_blank" rel="noopener"}
-->

<!--
| Column-1  | Column-2  | Column-3 |
|:----------|:----------|:---------|
| 1         | A         | abc      |
| 2         | B         | bcd      |
| 3         | C         | cde      |
| 4         | D         | def      |
-->

<!--
```markdown
### Statistical characteristics of microstate sequences
Microstate sequences can characterized by the probability distribution of the microstate labels, and the transition matrix $T$, which contains the conditional probabilities of a transition from label $S_i$ at time $t$ to label $S_j$ at time $t+1$.
### Markovianity
A stationary first-order Markov process is fully described by its initial symbol distribution $p_0$, and its transition matrix $T_{ij}$.
### Microstate periodicity
Markdown is a lightweight and easy-to-use syntax for styling your writing. It includes conventions for
- Bulleted
- List
1. Numbered
2. List
**Bold** and _Italic_ and `Code` text
[UNSW](https://medicalsciences.med.unsw.edu.au/research/groups/translational-neuroscience-facility)  
and  
![Conformal map](pic2.png)
```
-->

<!--
For more details see [GitHub Flavored Markdown](https://guides.github.com/features/mastering-markdown/).
-->

<!--
### Jekyll Themes
Your Pages site will use the layout and styles from the Jekyll theme you have selected in your [repository settings](https://github.com/Frederic-vW/Frederic-vW.github.io/settings). The name of this theme is saved in the Jekyll `_config.yml` configuration file.
-->
<!--
### Support or Contact
Having trouble with Pages? Check out our [documentation](https://help.github.com/categories/github-pages-basics/) or [contact support](https://github.com/contact) and we’ll help you sort it out.
-->
